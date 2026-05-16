/* Silver AI Support Bot — prospect widget for nicsilver.com
 *
 * Anonymous chat. Posts to the Convex endpoint configured via the
 * data-endpoint attribute on the script tag:
 *
 *   <link rel="stylesheet" href="css/widget.css">
 *   <script src="js/widget.js"
 *           data-endpoint="https://<deployment>.convex.site/api/bot/prospect/chat"
 *           defer></script>
 *
 * The widget persists conversationId in sessionStorage so a page reload or
 * navigation within the same tab continues the same conversation. Closing
 * the tab ends it.
 */

(function () {
  "use strict";

  // -------- config --------
  const script = document.currentScript;
  const ENDPOINT = (script && script.dataset && script.dataset.endpoint) || "";
  if (!ENDPOINT) {
    console.warn(
      "[silverai-widget] No data-endpoint attribute on script tag. Widget disabled.",
    );
    return;
  }
  const STORAGE_KEY = "silverai_bot_conversation";
  const HISTORY_KEY = "silverai_bot_history";
  const WELCOME =
    "Hi. I'm the Silver AI Support assistant. Ask me anything about Nic's offerings, what the audit covers, pricing, or when he's available. If you want to talk to Nic directly I can book you in.";

  // -------- state --------
  let conversationId = null;
  let history = []; // [{ role, content }]
  let sending = false;
  let dom = {};

  try {
    conversationId = sessionStorage.getItem(STORAGE_KEY) || null;
    history = JSON.parse(sessionStorage.getItem(HISTORY_KEY) || "[]");
  } catch (e) {
    conversationId = null;
    history = [];
  }

  // -------- DOM build --------
  function build() {
    const launcher = document.createElement("button");
    launcher.className = "sai-widget-launcher";
    launcher.setAttribute("aria-label", "Open Silver AI Support chat");
    launcher.innerHTML =
      '<span class="sai-badge-new" aria-hidden="true"></span>' +
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' +
      "</svg>";
    launcher.addEventListener("click", toggle);
    document.body.appendChild(launcher);

    const panel = document.createElement("div");
    panel.className = "sai-widget-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Silver AI Support chat");
    panel.innerHTML = `
      <div class="sai-widget-header">
        <div>
          <div class="sai-widget-header-title">Silver AI Support</div>
          <div class="sai-widget-header-sub">Ask anything · Nic replies 9-5 CET</div>
        </div>
        <button class="sai-widget-close" aria-label="Close chat">
          <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="sai-widget-body" role="log" aria-live="polite"></div>
      <form class="sai-widget-footer">
        <textarea class="sai-input" rows="1" placeholder="Type a message…" aria-label="Type a message" maxlength="2000"></textarea>
        <button class="sai-send" type="submit">Send</button>
      </form>
      <div class="sai-disclaimer">
        AI assistant. For urgent matters, email <a href="mailto:contact@nicsilver.com">contact@nicsilver.com</a>.
      </div>
    `;
    document.body.appendChild(panel);

    dom = {
      launcher,
      panel,
      body: panel.querySelector(".sai-widget-body"),
      input: panel.querySelector(".sai-input"),
      send: panel.querySelector(".sai-send"),
      form: panel.querySelector(".sai-widget-footer"),
      close: panel.querySelector(".sai-widget-close"),
    };

    dom.close.addEventListener("click", toggle);
    dom.form.addEventListener("submit", onSend);
    dom.input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend(e);
      }
    });
    dom.input.addEventListener("input", autoGrowInput);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("sai-open")) {
        toggle();
      }
    });
  }

  function autoGrowInput() {
    dom.input.style.height = "auto";
    dom.input.style.height = Math.min(dom.input.scrollHeight, 100) + "px";
  }

  function toggle() {
    const opening = !dom.panel.classList.contains("sai-open");
    dom.panel.classList.toggle("sai-open");
    if (opening) {
      // Hide the "new" badge once the user has engaged.
      const badge = dom.launcher.querySelector(".sai-badge-new");
      if (badge) badge.style.display = "none";
      renderHistory();
      setTimeout(function () {
        dom.input.focus();
      }, 50);
    }
  }

  function renderHistory() {
    dom.body.innerHTML = "";
    if (history.length === 0) {
      appendBot(WELCOME);
      return;
    }
    history.forEach(function (m) {
      if (m.role === "user") appendUser(m.content, true);
      else appendBot(m.content, m.bookingUrl, true);
    });
  }

  function appendUser(text, skipPersist) {
    const div = document.createElement("div");
    div.className = "sai-msg sai-msg-user";
    div.textContent = text;
    dom.body.appendChild(div);
    scrollToBottom();
    if (!skipPersist) {
      history.push({ role: "user", content: text });
      persist();
    }
  }

  function appendBot(text, bookingUrl, skipPersist) {
    const div = document.createElement("div");
    div.className = "sai-msg sai-msg-bot";
    div.textContent = text;
    dom.body.appendChild(div);
    if (bookingUrl) {
      const pill = document.createElement("a");
      pill.className = "sai-book-pill";
      pill.href = bookingUrl;
      pill.target = "_blank";
      pill.rel = "noopener noreferrer";
      pill.textContent = "Book an Intro Call";
      pill.addEventListener("click", function () {
        // Mark booking intent locally; the server already has UTM tracking.
        try {
          if (window.plausible) window.plausible("Bot Booking Click");
        } catch (e) {}
      });
      dom.body.appendChild(pill);
    }
    scrollToBottom();
    if (!skipPersist) {
      history.push({ role: "assistant", content: text, bookingUrl: bookingUrl });
      persist();
    }
  }

  function appendSystem(text) {
    const div = document.createElement("div");
    div.className = "sai-msg sai-msg-system";
    div.textContent = text;
    dom.body.appendChild(div);
    scrollToBottom();
  }

  function appendError(text) {
    const div = document.createElement("div");
    div.className = "sai-msg sai-msg-error";
    div.textContent = text;
    dom.body.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "sai-typing";
    div.id = "sai-typing-indicator";
    div.innerHTML = "<span></span><span></span><span></span>";
    dom.body.appendChild(div);
    scrollToBottom();
  }

  function hideTyping() {
    const el = document.getElementById("sai-typing-indicator");
    if (el) el.remove();
  }

  function scrollToBottom() {
    dom.body.scrollTop = dom.body.scrollHeight;
  }

  function persist() {
    try {
      if (conversationId) sessionStorage.setItem(STORAGE_KEY, conversationId);
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-30)));
    } catch (e) {
      // sessionStorage might be full or unavailable. Continue silently.
    }
  }

  async function onSend(e) {
    if (e) e.preventDefault();
    if (sending) return;

    const message = dom.input.value.trim();
    if (!message) return;
    if (message.length > 2000) {
      appendError("Message too long. Please keep it under 2000 characters.");
      return;
    }

    sending = true;
    dom.send.disabled = true;
    dom.input.disabled = true;

    appendUser(message);
    dom.input.value = "";
    autoGrowInput();
    showTyping();

    try {
      const resp = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          conversationId: conversationId || undefined,
          message: message,
          history: history.slice(-12).map(function (m) {
            return { role: m.role, content: m.content };
          }),
          referrer: window.location.pathname,
        }),
      });

      hideTyping();

      if (resp.status === 429) {
        const data = await resp.json().catch(function () {
          return {};
        });
        appendError(
          data.detail ||
            "You've hit the daily rate limit. Email contact@nicsilver.com for anything urgent.",
        );
        return;
      }
      if (!resp.ok) {
        appendError(
          "Something went wrong on my end. Please try again, or email contact@nicsilver.com.",
        );
        return;
      }

      const data = await resp.json();
      conversationId = data.conversationId || conversationId;
      appendBot(data.reply || "(no response)", data.bookingUrl);
      persist();

      try {
        if (window.plausible) window.plausible("Bot Reply");
      } catch (e) {}
    } catch (err) {
      hideTyping();
      appendError(
        "Network error. Check your connection or email contact@nicsilver.com.",
      );
    } finally {
      sending = false;
      dom.send.disabled = false;
      dom.input.disabled = false;
      dom.input.focus();
    }
  }

  // -------- boot --------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
