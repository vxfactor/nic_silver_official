// ThriveCart -> Flodesk fulfillment webhook for the Workspace Tune-Up Kit.
//
// ThriveCart posts form-encoded order events here (Settings > API & Webhooks).
// On a live order.success we upsert the buyer into Flodesk and add them to
// the buyer segment(s). The delivery email itself is a Flodesk workflow
// triggered by the segment, so this function never sends anything directly.
//
// Required Netlify environment variables (Site settings > Environment):
//   FLODESK_API_KEY     - Flodesk API key
//   THRIVECART_SECRET   - ThriveCart Settings > API & Webhooks > secret word
//
// Segment IDs are constants below; they are not secrets.

const FLODESK_API = "https://api.flodesk.com/v1";
const SEGMENT_TUNE_UP_KIT = "6a2c635bce488844716b583d"; // Tune-Up Kit Buyers
const SEGMENT_SKILLS_LIBRARY = "6a2b14acbc36bfec72df5619"; // Skills Library Buyers (order bump)

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "method not allowed" };
  }

  const params = new URLSearchParams(event.body || "");
  const get = (key) => params.get(key) || "";

  // Auth: ThriveCart includes the account secret word in every webhook.
  if (!process.env.THRIVECART_SECRET || get("thrivecart_secret") !== process.env.THRIVECART_SECRET) {
    return { statusCode: 401, body: "bad secret" };
  }

  // Only completed orders. ThriveCart sends other events too; acknowledge and skip.
  if (get("event") !== "order.success") {
    return { statusCode: 200, body: "ignored event" };
  }
  // mode: "test" while Nic test-buys, "live" in production. Tag both; the
  // segment shows mode via the test email address used.
  const email = get("customer[email]").trim().toLowerCase();
  const firstName = get("customer[first_name]");
  const lastName = get("customer[last_name]");
  if (!email) {
    return { statusCode: 400, body: "no customer email" };
  }

  // purchase_map_flat looks like "product-1, bump-1" when the bump was taken.
  const purchaseMap = get("purchase_map_flat");
  const segmentIds = [SEGMENT_TUNE_UP_KIT];
  if (/bump-/.test(purchaseMap)) {
    segmentIds.push(SEGMENT_SKILLS_LIBRARY);
  }

  const auth = "Basic " + Buffer.from(`${process.env.FLODESK_API_KEY}:`).toString("base64");
  const headers = { Authorization: auth, "Content-Type": "application/json" };

  try {
    // Upsert the subscriber (Flodesk creates or updates by email).
    const upsert = await fetch(`${FLODESK_API}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, first_name: firstName, last_name: lastName }),
    });
    if (!upsert.ok) {
      const detail = await upsert.text();
      console.error("flodesk upsert failed", upsert.status, detail);
      return { statusCode: 502, body: "flodesk upsert failed" };
    }
    const subscriber = await upsert.json();

    // Add to the buyer segment(s); this is what triggers the delivery workflow.
    // Use the subscriber ID in the path: Flodesk 404s on percent-encoded
    // emails (%40), so an email-in-path URL breaks for every real address.
    // Retry one 404 in case the fresh upsert is not yet readable.
    const addToSegments = () =>
      fetch(`${FLODESK_API}/subscribers/${subscriber.id}/segments`, {
        method: "POST",
        headers,
        body: JSON.stringify({ segment_ids: segmentIds }),
      });
    let seg = await addToSegments();
    if (seg.status === 404) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      seg = await addToSegments();
    }
    if (!seg.ok) {
      const detail = await seg.text();
      console.error("flodesk segment add failed", seg.status, detail);
      return { statusCode: 502, body: "flodesk segment failed" };
    }

    console.log(`tune-up-kit order ${get("order_id")} -> ${email} segments ${segmentIds.join(",")}`);
    return { statusCode: 200, body: "ok" };
  } catch (err) {
    console.error("webhook error", err);
    return { statusCode: 500, body: "internal error" };
  }
};
