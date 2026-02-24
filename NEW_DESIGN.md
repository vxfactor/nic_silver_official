=============================================
UI DESIGN SPECIFICATION
=============================================

PROJECT: Silver AI Consulting — Visual Redesign
TYPE: Update (applying new design system to existing site)
SCOPE: Full Site (5 pages + global components)
TARGET: Responsive — Mobile-first (breakpoints at 768px, 1024px, 1440px)

CRITICAL CONSTRAINT:
  All existing content, copy, routing, CTAs, navigation structure,
  and functionality must be preserved exactly as-is. This spec
  covers ONLY the visual and interaction layer.

---------------------------------------------
1. DESIGN DIRECTION
---------------------------------------------

AESTHETIC:
  Editorial-meets-sketchbook. The foundation is clean, modern, and
  generously spaced — think high-end independent magazine layout with
  geometric sans-serif typography and precise alignment. Layered on top
  of that are hand-drawn SVG decorations (scribbles, arrows, thought
  bubbles, squiggly underlines, gear doodles) rendered in the brand
  accent red, creating a "creative brainstorm on paper" energy. The
  halftone/newsprint texture appears in select background areas and
  image treatments, giving the whole site a tactile, analog warmth
  despite the modern layout grid. It should feel like a brilliant
  strategist's working notebook — organized but alive with ideas.

REFERENCE PRINCIPLES (from provided images):
  - Black-and-white halftone photographic style with visible dot grain
  - Energetic red hand-drawn annotations: scribbles, arrows, lightning
    bolts, thought bubbles, gears, squiggly lines
  - Warm cream/off-white paper-like backgrounds
  - High contrast between the structured (photography, type) and the
    loose (hand-drawn elements)
  - The doodles feel spontaneous and human — not polished vector
    illustrations. They should look like someone grabbed a red pen
    and marked up a printed page

COLOR SYSTEM:
  Background (primary):     #FEFFFF — near-white with the faintest cool tint
  Background (secondary):   #F5F1EE — warm parchment cream, used for alternating
                            sections and card surfaces
  Background (tertiary):    #E8E2DE — warm stone, used for hover states on cards,
                            the guarantee section, and subtle highlight bands
  Background (dark):        #493B35 — deep warm brown, used for the final CTA
                            section, footer, and high-contrast feature sections
  Text (primary):           #493B35 — warm near-black brown on light backgrounds
  Text (secondary):         #A58372 — muted warm brown for labels, captions,
                            section tags, and secondary copy
  Text (on dark):           #FEFFFF — near-white on dark brown backgrounds
  Text (on dark, muted):    #E8E2DE — warm stone for secondary text on dark
  Accent (primary):         #F24B2E — vivid red-orange, used for CTAs, links,
                            hand-drawn SVG doodles, hover states, and emphasis
  Accent (hover):           #D93E23 — slightly deeper red for button hover states
  Accent (subtle):          #F24B2E at 10% opacity — for light accent backgrounds,
                            tag backgrounds, and subtle highlight strips
  Border/Divider:           #E8E2DE — warm stone for card borders and section
                            dividers on light backgrounds
  Border (on dark):         #A58372 at 30% opacity — for dividers on dark sections
  Feedback — Success:       #2D8A4E — natural green
  Feedback — Error:         #F24B2E — shares the accent red (contextual)
  Feedback — Warning:       #D4930D — warm amber

TYPOGRAPHY:
  Display/Headings:   A geometric sans-serif with personality. Direction: something
                      in the family of Satoshi, General Sans, Switzer, or similar —
                      clean geometry with slightly humanist proportions. Weight 700
                      (bold) for headlines. Sizes scale from roughly 3.5rem (hero h1)
                      down to 1.5rem (h4). Letter-spacing: tight (-0.02em on display
                      sizes, normal on smaller headings).

  Body text:          Same geometric sans-serif family, weight 400 (regular). Size
                      1.125rem (18px). Line-height 1.65 for comfortable reading.
                      Paragraphs capped at roughly 65 characters wide for optimal
                      readability. Color: #493B35 on light, #F5F1EE on dark.

  Labels/Captions:    Same family, weight 500 (medium). Size 0.8rem (13px).
                      Uppercase with letter-spacing +0.08em. Color: #A58372.
                      Used for section labels ("Sound familiar?", "There's a
                      better way"), step labels, and metadata.

  Monospace:          Not required for this site. If code-like elements appear
                      in future content, use JetBrains Mono or IBM Plex Mono
                      at body size.

  NOTE: The implementing agent should select the closest available free
  equivalent. Google Fonts options: Inter (safe fallback), DM Sans
  (slightly warmer), or Outfit (more geometric). If using a premium
  font service: Satoshi or General Sans are ideal.

SPACING PHILOSOPHY:
  Generous and breathing. This site sells a premium, considered service —
  the spacing should reflect that. Section padding is large: roughly 6rem
  (96px) vertical on desktop, scaling to 4rem (64px) on mobile. Within
  sections, elements are spaced at 1.5rem to 2rem intervals. The rhythm
  alternates between spacious hero/statement sections and slightly denser
  informational sections (the 4-step method, stats row). Cards and
  contained elements use 2rem internal padding. The overall feel is
  "high-end editorial spread" not "SaaS landing page."

CORNER TREATMENT:
  Primarily sharp corners (0px radius) on cards, sections, and containers.
  This reinforces the editorial/print aesthetic. Exceptions:
  - CTA buttons: subtle 4px radius — just enough to soften without going pill
  - Avatar/photo: full circle crop if used
  - Tag/badge elements: 2px radius
  The sharp corners contrast with the loose, organic hand-drawn SVG
  doodles, creating intentional visual tension between structure and
  spontaneity.

SHADOW & DEPTH:
  Mostly flat. The depth model relies on background color shifts between
  sections rather than drop shadows. The only shadow usage:
  - Cards on hover: a very subtle 0 2px 8px rgba(73, 59, 53, 0.06) lift
  - Sticky navigation (when scrolled): 0 1px 0 #E8E2DE — just a single
    pixel border-shadow to separate from content
  The hand-drawn SVG doodles create visual "depth" through layering, but
  this is compositional, not shadow-based.

HAND-DRAWN SVG DECORATION SYSTEM:
  This is the signature visual element of the site. SVG doodle elements
  rendered in #F24B2E (accent red) with a 2px stroke weight and a slightly
  rough, hand-drawn path quality (not perfect geometric shapes). These
  are positioned as decorative accents around key content areas.

  Element library needed:
  - Squiggly underlines (for emphasizing key phrases in headlines)
  - Loose circles/ovals (for circling important words or stats)
  - Arrows (curved, pointing to CTAs or key content)
  - Scribble clouds/thought bubbles (near ideation-related content)
  - Lightning bolts (near energy/impact content)
  - Gear doodles (near process/method content)
  - Abstract scribbles (purely decorative, background texture)
  - Asterisk/star bursts (for the guarantee section)
  - Wavy lines / underlines (section dividers as an alternative to
    straight rules)
  - Cross-hatch marks (small accent marks near labels)

  Placement rules:
  - Hero section: 2-3 doodle elements framing the headline area (a squiggly
    underline beneath a key phrase, an arrow pointing to CTA, scattered
    scribbles in the margin)
  - Section headers: one doodle element per section header area — a circle
    around a word, an underline, or a small arrow
  - Stats section: loose circles around the big numbers
  - Method steps: gear and arrow doodles connecting the steps
  - Guarantee section: asterisk/starburst doodle near the headline
  - Footer/final CTA: scattered scribble energy
  - NEVER on body copy paragraphs — doodles accent structure, not prose
  - Doodles should feel scattered and organic, not symmetrically placed
  - On mobile, reduce doodle count by roughly 40% to prevent clutter

  Technical implementation:
  - Inline SVG elements, absolutely or relatively positioned
  - Stroke-based, no fills (except scribble clouds which can have a
    very thin fill at 5% opacity)
  - Animate on scroll-into-view: draw-on effect using stroke-dasharray
    and stroke-dashoffset, duration 600-800ms, eased
  - Total SVG payload across all pages should stay under 50KB

HALFTONE TEXTURE:
  A subtle halftone dot pattern (like newsprint grain) applied as a
  background texture on the #F5F1EE sections. Implementation: a small
  repeating SVG or PNG pattern at very low opacity (3-5%). This gives
  those sections a tactile, printed-paper quality without being
  distracting. On the #E8E2DE sections (guarantee, dark accent areas),
  the halftone can be slightly more visible (6-8%).

  If a photo of Nic is used on the About section, apply a halftone/
  duotone filter to it — converting it to the black-and-white halftone
  style seen in the reference images, with optional red doodle
  annotations overlaid.

---------------------------------------------
2. LAYOUT STRUCTURE
---------------------------------------------

OVERALL SITE STRUCTURE:

  ┌─────────────────────────────────────────────────────┐
  │  STICKY NAV BAR (full width)                        │
  ├─────────────────────────────────────────────────────┤
  │                                                     │
  │  CONTENT SECTIONS (full-width backgrounds,          │
  │  content constrained to max-width container)        │
  │                                                     │
  │  Alternating background colors between sections:    │
  │  #FEFFFF → #F5F1EE → #FEFFFF → #E8E2DE → etc.     │
  │                                                     │
  ├─────────────────────────────────────────────────────┤
  │  FOOTER (full width, dark background #493B35)       │
  └─────────────────────────────────────────────────────┘

  Content container: max-width 1200px, centered, with horizontal
  padding of 2rem (scales to 1.25rem on mobile).

  No sidebar. Single-column layout throughout. Some sections use
  internal grid layouts (stats row, method steps, testimonial cards)
  but the page itself is a vertical scroll.

SECTION BACKGROUND PATTERN:
  Sections alternate backgrounds to create visual rhythm and separation.
  The pattern for the homepage:

  Hero:                #FEFFFF (primary white)
  The Problem:         #F5F1EE (warm cream) + halftone texture
  The Solution:        #FEFFFF
  How It Works:        #F5F1EE (warm cream) + halftone texture
  Stats/Results:       #493B35 (dark brown — high contrast moment)
  Testimonials:        #FEFFFF
  Who This Is For:     #F5F1EE (warm cream)
  The Guarantee:       #E8E2DE (warm stone) — feels like a distinct card/callout
  About (short):       #FEFFFF
  Final CTA:           #493B35 (dark brown — bookends with stats section)

NAVIGATION:
  ┌─────────────────────────────────────────────────────┐
  │  SILVER AI [logo/wordmark]     Home  How It Works   │
  │                                About  Results       │
  │                                Contact              │
  │                         [Book a Discovery Call] btn  │
  └─────────────────────────────────────────────────────┘

  - Fixed/sticky at top on scroll
  - Background: #FEFFFF with 1px bottom border #E8E2DE (appears on scroll)
  - Logo/wordmark: "SILVER AI" in heading font, weight 700, #493B35
    Consider a small red doodle accent integrated into the logo —
    a squiggly underline or a tiny scribble element
  - Nav links: body font, weight 500, #493B35, no underline
  - Nav link hover: color transitions to #F24B2E
  - Active page: #F24B2E color with a hand-drawn squiggly underline SVG
    beneath (not a CSS border — an actual SVG scribble line)
  - CTA button in nav: #F24B2E background, #FEFFFF text, 4px radius,
    weight 600. Hover: #D93E23 background
  - Height: approximately 72px on desktop, 64px on mobile
  - On mobile (<768px): hamburger menu icon (two or three hand-drawn-
    style lines in #493B35), opens full-screen overlay with centered
    nav links on #FEFFFF background

COMPONENT INVENTORY:

  Global:
  - Navigation bar (sticky, with CTA)
  - Footer (dark, three-column on desktop)
  - Primary CTA button ("Book a Discovery Call")
  - Secondary CTA link ("See how it works ↓", "Read the full story →")
  - Section label (small uppercase tag above headlines)
  - Section headline
  - Body copy block
  - Hand-drawn SVG doodle elements (decorative layer)

  Homepage-specific:
  - Hero headline block (oversized typography)
  - Problem narrative block (long-form copy section)
  - Method step card (numbered, with label + headline + copy)
  - Stat card (big number + short label)
  - Testimonial card (quote + name + role)
  - "Who this is for" list (stacked lines, not bullets)
  - Guarantee callout card (distinct background)
  - About summary block (copy + optional photo)

  How It Works page:
  - Phase detail block (headline + copy + deliverable callout)
  - Deliverable tag (inline callout within each phase)

  Results page:
  - Stats bar (repeated from homepage)
  - Case study card (expandable or linked)
  - Testimonial grid

  About page:
  - Long-form bio section
  - Optional photo with halftone treatment

  Contact page:
  - Contact info block (links to TidyCal, email, LinkedIn)
  - Contact form (4 fields + submit)

---------------------------------------------
3. COMPONENT DETAIL
---------------------------------------------

[NAVIGATION BAR]
  Purpose:      Primary site navigation + persistent CTA access
  Contains:     Logo/wordmark, 5 nav links, 1 CTA button
  Layout:       Horizontal row. Logo left-aligned, nav links and CTA
                right-aligned. Vertically centered within 72px height.
  Visual:       Background #FEFFFF. No border initially. On scroll past
                ~100px, a 1px bottom border in #E8E2DE fades in (150ms).
                Backdrop-filter: blur(8px) with background at 95% opacity
                for a subtle frosted effect when content scrolls behind.
  Content:      Logo: "SILVER AI" | Links: Home, How It Works, About,
                Results, Contact | Button: "Book a Discovery Call"

  States:
    Default:    Clean bar, no bottom border, fully opaque background
    Scrolled:   1px bottom border appears, slight backdrop blur
    Link hover: Text color animates to #F24B2E (150ms ease)
    Active page: Link text in #F24B2E with hand-drawn SVG underline
    Mobile:     Logo left, hamburger icon right. Tap opens full-screen
                overlay. Nav links stacked vertically, centered, with
                generous 1.5rem spacing between. CTA button at bottom
                of the overlay stack. Close icon (X) top-right.
    Mobile open: Overlay background #FEFFFF, links fade in staggered
                 (50ms delay between each, 200ms duration)

---

[PRIMARY CTA BUTTON]
  Purpose:      Main conversion action — Book a Discovery Call
  Contains:     Text label, optional arrow icon
  Layout:       Inline-block. Padding: 1rem horizontal, 0.75rem vertical.
  Visual:       Background #F24B2E, text #FEFFFF, font weight 600,
                font size 1rem, 4px border radius. No border.
                A small hand-drawn arrow SVG can sit to the right of
                the text (optional, context-dependent).
  Content:      "Book a Discovery Call"

  States:
    Default:    #F24B2E background, #FEFFFF text
    Hover:      Background shifts to #D93E23, subtle translateY(-1px)
                lift, transition 200ms ease
    Active:     translateY(0px), background #C4351D (slightly darker)
    Focus:      2px outline in #F24B2E at 40% opacity, offset 2px
    Disabled:   Not applicable on this site (always active)
    Loading:    If form submission: text replaced with a small spinner,
                background unchanged

---

[SECONDARY CTA LINK]
  Purpose:      Lower-commitment action or navigation pointer
  Contains:     Text + arrow character (↓ or →)
  Layout:       Inline text element
  Visual:       Text color #F24B2E, weight 500, underline: hand-drawn
                SVG squiggly line in #F24B2E (not CSS text-decoration).
                Arrow character in same color.
  Content:      Varies: "See how it works ↓", "Read the full story →",
                "See the case studies"

  States:
    Default:    #F24B2E text with SVG underline
    Hover:      Underline animates slightly (subtle wiggle or redraw),
                arrow translates 4px in its direction (200ms ease)

---

[SECTION LABEL]
  Purpose:      Small contextual tag above section headlines
  Contains:     Short text string
  Layout:       Block element, sits directly above the section headline
                with 0.75rem gap below
  Visual:       Font: label style — uppercase, weight 500, 0.8rem,
                letter-spacing +0.08em. Color: #A58372.
                Optional: a tiny hand-drawn cross-hatch or dash SVG
                to the left of the label text.
  Content:      "Sound familiar?", "There's a better way", etc.

  States:
    Default:    Static, no interaction

---

[SECTION HEADLINE]
  Purpose:      Primary headline for each content section
  Contains:     Headline text, optional hand-drawn SVG accent
  Layout:       Block element. Max-width roughly 800px (prevents overly
                wide lines on large screens). Left-aligned on most
                sections, centered on hero and final CTA.
  Visual:       Font: heading style — weight 700, size 2.5rem on desktop
                (scales to 1.75rem on mobile). Color: #493B35 on light
                backgrounds, #FEFFFF on dark. Line-height: 1.15.
                Tight letter-spacing: -0.02em.
                Key phrases within headlines can have a hand-drawn SVG
                squiggly underline or circle in #F24B2E layered beneath.
  Content:      Varies per section (see site copy document)

  States:
    Default:    Static display
    Scroll-in:  Fades up from 20px below, opacity 0→1, 500ms ease-out

---

[HERO SECTION — Homepage]
  Purpose:      First impression. Communicate core value proposition
                and drive to primary CTA.
  Contains:     Headline, subheadline, primary CTA button, secondary
                CTA link, hand-drawn SVG doodles
  Layout:       Centered text block within the content container.
                Headline at top, subheadline below with 1.5rem gap,
                CTA button below subheadline with 2rem gap, secondary
                link below button with 1rem gap. Total section height
                should be roughly 85-95vh on desktop so the CTA is
                visible without scrolling. On mobile, full content
                visible without scroll.
  Visual:       Background #FEFFFF. No image. Typography-driven.
                Hand-drawn SVG doodles scattered around the headline
                area: a squiggly underline beneath "double your output",
                a curved arrow pointing toward the CTA button, and 2-3
                abstract scribble elements floating in the periphery
                (top-right, bottom-left). These doodles should feel like
                margin annotations on an editorial spread.
  Content:
    Headline:   "Double your output without killing your brand."
    Subheadline: "We help marketing and creative agencies scale content
                  using AI that actually sounds like the brand wrote it.
                  More clients. Same team. Better margins."
    CTA:        "Book a Discovery Call"
    Secondary:  "See how it works ↓"

  Headline sizing:
    Desktop (≥1024px):  3.5rem, weight 700
    Tablet (768-1023):  2.75rem
    Mobile (<768px):    2.25rem

  Subheadline:
    Font: body style, weight 400, 1.25rem on desktop (1.125rem mobile).
    Color: #A58372 (secondary text). Max-width 600px, centered.
    Line-height: 1.6.

  States:
    Load:       Headline fades in first (300ms), subheadline follows
                (200ms delay), CTA follows (400ms delay). SVG doodles
                draw on with stroke animation (600ms, starts at 300ms).
    Scroll:     When user scrolls past ~50% of hero, the decorative
                doodles begin to fade out (parallax-light, subtle)

---

[PROBLEM SECTION — Homepage]
  Purpose:      Empathy section — make the visitor feel understood
  Contains:     Section label, headline, body copy (4 paragraphs)
  Layout:       Left-aligned text within content container. Max-width
                720px for the copy block (narrower than full container
                for comfortable reading). Section label above headline,
                headline above copy.
  Visual:       Background #F5F1EE with subtle halftone texture overlay.
                No decorative elements except one small hand-drawn
                squiggly line as a section divider above the section
                label. Copy should feel clean and unadorned — the words
                do the work here.
  Content:      Section label: "Sound familiar?"
                Headline: "You're growing. Your content quality isn't."
                Body: [4 paragraphs from copy document]
                Final line ("What if that's a false choice?") styled
                slightly differently — weight 500, color #493B35 (not
                secondary), to land as a pivot statement.

  Paragraph spacing: 1.25rem between paragraphs.

  States:
    Scroll-in:  Section label and headline fade-up (500ms).
                Body paragraphs fade-up staggered (100ms delay between
                each, 400ms duration).

---

[SOLUTION SECTION — Homepage]
  Purpose:      Introduce the Voice DNA concept as the answer
  Contains:     Section label, headline, body copy, CTA button
  Layout:       Left-aligned, same max-width as Problem section (720px).
                CTA button sits below body copy with 2.5rem gap.
  Visual:       Background #FEFFFF. A hand-drawn SVG doodle of a DNA-
                like squiggle or helix mark in the margin area (right
                side on desktop, behind the text at low opacity on
                mobile). One phrase in the headline — "Voice DNA" —
                could have a loose hand-drawn circle around it in
                #F24B2E.
  Content:      Section label: "There's a better way"
                Headline: "Your brand has DNA. We make sure AI doesn't
                destroy it."
                Body: [3 paragraphs from copy document]
                CTA: "Book a Discovery Call"

  States:
    Scroll-in:  Same pattern as Problem section
    DNA doodle: Draws on with stroke animation when section enters
                viewport (800ms)

---

[METHOD STEP CARD]
  Purpose:      Display one step of the 4-step Voice DNA Method
  Contains:     Step number, label (Sequence/Encode/Replicate/Verify),
                headline, body copy
  Layout:       On desktop: 4 cards in a 2×2 grid with 2rem gap.
                Each card is a vertical stack: number → label →
                headline → copy. Internal padding: 2rem.
                On tablet: 2×2 grid maintained, smaller padding.
                On mobile: single column stack, full width.
  Visual:       Card background #FEFFFF (sits on #F5F1EE section
                background). Border: 1px solid #E8E2DE. Sharp corners
                (0px radius). The step number is displayed large (3rem)
                in #F24B2E with a hand-drawn circle doodle around it.
                The label (Sequence, Encode, etc.) is in label style —
                uppercase, #A58372, letterspaced. Below each card,
                a thin hand-drawn connecting line or arrow doodle links
                to the next step (on desktop: across and down; on
                mobile: downward between cards).
  Content:      Step 1: "01" / SEQUENCE / "Decode your Voice DNA" / [copy]
                Step 2: "02" / ENCODE / "Teach it to AI" / [copy]
                Step 3: "03" / REPLICATE / "Scale without mutations" / [copy]
                Step 4: "04" / VERIFY / "Check the fidelity" / [copy]

  Section header above the grid:
    Headline: "The Voice DNA Method"
    Subheadline: "Four steps. One goal: your brand voice, replicated
    perfectly at scale." (body font, weight 400, color #A58372)

  States:
    Default:    Card at rest, 1px border #E8E2DE
    Hover:      Border color shifts to #F24B2E at 30% opacity,
                very subtle shadow appears (200ms ease)
    Scroll-in:  Cards appear staggered — 150ms delay between each,
                fade-up from 20px, 500ms duration

---

[STAT CARD]
  Purpose:      Display a single impressive metric
  Contains:     Big number/value, short label
  Layout:       4 stat cards in a horizontal row on desktop (equal
                width, 2rem gap). On tablet: 2×2 grid. On mobile:
                2×2 grid with tighter gap (1rem).
  Visual:       This section uses the dark background (#493B35).
                The stat number is displayed very large — 4rem on
                desktop, 3rem on mobile — in #FEFFFF, weight 700.
                The label below is in #E8E2DE, weight 400, 0.9rem.
                Each stat has a hand-drawn loose circle or underline
                doodle in #F24B2E around or beneath the number.
                No card background — the stats sit directly on the
                dark section.
  Content:      "3x" / Revenue increase for clients
                "20%" / Boost in content engagement
                "2x" / Client capacity on the same team
                "Days" / Not weeks. Content delivery time.

  Section also includes:
    Headline: "The numbers don't lie. The content doesn't sound like
    AI either." — in #FEFFFF, centered above stats.
    Subtext below stats: "These aren't hypothetical projections..." —
    in #E8E2DE, centered.
    CTA: "See the case studies" (secondary link style, #F24B2E on dark)

  States:
    Scroll-in:  Numbers count up from 0 to their value (800ms, eased).
                "Days" types in letter by letter. Labels fade in after
                numbers finish (200ms delay). Doodle circles draw on
                during the count animation.

---

[TESTIMONIAL CARD]
  Purpose:      Display a single client testimonial
  Contains:     Quote text, client name, company/role
  Layout:       Cards in a 3-column grid on desktop (equal width,
                2rem gap). 2-column on tablet. Single column on
                mobile. Cards are not equal height — masonry-style
                layout if quotes vary significantly in length;
                otherwise simple grid is fine.
  Visual:       Card background #F5F1EE. Border: 1px solid #E8E2DE.
                Sharp corners. Padding: 2rem. A large hand-drawn
                quotation mark doodle in #F24B2E (SVG) sits in the
                top-left corner of each card, partially overlapping
                the border edge (positioned absolutely, offset -12px
                top and -8px left). Quote text in body font, weight
                400, #493B35. Any specific numbers or results within
                the quote should be highlighted in #F24B2E weight 600.
                Name: weight 600, #493B35. Role: weight 400, #A58372.
  Content:      [To be populated with Nic's real testimonials]

  States:
    Default:    At rest
    Hover:      Border color shifts to #F24B2E at 20% opacity (200ms)
    Scroll-in:  Staggered fade-up (100ms delay between cards)

---

["WHO THIS IS FOR" LIST]
  Purpose:      Qualification section — let the right visitors self-select
  Contains:     Headline, intro paragraph, stacked qualifying statements
  Layout:       Left-aligned, max-width 720px. Qualifying statements
                stacked vertically with 1rem gap between each line.
                NOT bullet points — each statement is a standalone line
                of text.
  Visual:       Background #F5F1EE. Each qualifying statement is
                preceded by a small hand-drawn checkmark or dash SVG
                in #F24B2E (replaces traditional bullet points with
                a hand-drawn element). Statement text in body font,
                weight 400, #493B35. The final line ("If you're
                nodding at any of those, we should talk.") in weight
                500, with a slight size bump to 1.1875rem, and a
                hand-drawn underline beneath "we should talk."
  Content:      [5 qualifying statements from copy document]

  States:
    Scroll-in:  Checkmarks draw on staggered (100ms delay), text
                fades in alongside each checkmark

---

[GUARANTEE CALLOUT]
  Purpose:      Build trust with a bold, specific guarantee
  Contains:     Headline, body copy
  Layout:       Full-width within content container. Padding: 3rem
                on desktop, 2rem on mobile. Centered text.
  Visual:       Background #E8E2DE (warm stone — distinct from
                surrounding sections). A thick 3px left border in
                #F24B2E runs the full height of the block (like a
                pull-quote or aside marker). OR: the entire block is
                bordered with a hand-drawn rectangle SVG in #F24B2E
                (slightly wobbly line, not a perfect CSS border).
                A hand-drawn asterisk/starburst doodle in #F24B2E
                sits near the headline. Headline in weight 700,
                #493B35. Body copy in weight 400.
  Content:      Headline: "The Voice DNA Guarantee"
                Body: [2 paragraphs from copy document]

  States:
    Scroll-in:  The hand-drawn border draws on (stroke animation,
                1000ms, starts from top-left corner and traces the
                full rectangle). Content fades in once border is
                ~50% drawn.

---

[ABOUT SUMMARY — Homepage]
  Purpose:      Give visitors enough of Nic's story to build trust
  Contains:     Headline, body copy, link to full about page, CTA,
                optional photo
  Layout:       Two-column on desktop: left column is text (60%),
                right column is photo (40%). On mobile: photo above
                text, full width. Photo is optional — if no photo,
                text goes full width with max-width 720px.
  Visual:       Background #FEFFFF. If photo is present: apply
                halftone/duotone black-and-white filter, with a
                few hand-drawn red doodles overlaid (scribbled
                annotations, a gear, an arrow). Photo has sharp
                corners, no border. The "Read the full story →"
                link uses the secondary CTA style.
  Content:      Headline: "The short version"
                Body: [4 paragraphs from copy document]
                Link: "Read the full story →"
                CTA: "Book a Discovery Call"

---

[FINAL CTA SECTION]
  Purpose:      Last conversion push before footer
  Contains:     Headline, body copy, primary CTA, secondary CTA
  Layout:       Centered text, max-width 700px. Generous vertical
                padding (8rem desktop, 5rem mobile).
  Visual:       Background #493B35 (dark). All text in light colors.
                Headline: #FEFFFF, 2.5rem, weight 700, centered.
                Body: #E8E2DE, centered. CTA button: #F24B2E bg,
                #FEFFFF text (same as primary button). Secondary
                CTA: #F24B2E text on dark. Hand-drawn SVG doodles
                scattered around this section — scribbles, arrows
                pointing to the CTA, energy marks. More doodle
                density here than other sections — this is the
                creative crescendo of the page.
  Content:      Headline: "Ready to double your output without killing
                your brand?"
                Body: [2 short paragraphs from copy document]
                CTA: "Book a Discovery Call"
                Secondary: 'Not ready for a call? DM me "DNA" on
                LinkedIn and I'll send you a free Voice DNA checklist.'

---

[FOOTER]
  Purpose:      Persistent bottom navigation and brand reinforcement
  Contains:     Copyright, tagline, social/contact links
  Layout:       Three-column on desktop: left (copyright), center
                (tagline), right (links). On mobile: stacked,
                centered, with 1rem gaps between rows.
  Visual:       Background #493B35 (continues from final CTA section
                if on homepage — no visible break between them).
                Top border: a hand-drawn wavy line SVG in #F24B2E
                (replaces a standard border). Text: #E8E2DE for
                copyright and tagline, #F24B2E for links.
                Padding: 3rem vertical.
  Content:      Left: "© Silver AI Consulting 2026"
                Center: "Double your output without killing your brand."
                Right: LinkedIn | Email | Book a Call

  States:
    Link hover: Opacity shift to 100% or subtle underline (200ms)

---

[CONTACT FORM]
  Purpose:      Lead capture with built-in qualification
  Contains:     4 input fields + submit button
  Layout:       Single column form, max-width 500px. Fields stacked
                with 1.25rem gap. Submit button full-width below
                the last field with 1.5rem gap.
  Visual:       Input fields: background #FEFFFF, border 1px #E8E2DE,
                sharp corners, padding 0.875rem 1rem. Font: body
                style, weight 400. Label above each field in label
                style (uppercase, #A58372, small). The open text
                field (bottleneck question) is a textarea, min-height
                120px.
  Content:      Field 1: "Name" (text input)
                Field 2: "Email" (email input)
                Field 3: "Agency name" (text input)
                Field 4: "What's the biggest bottleneck in your content
                process right now?" (textarea)
                Submit: "Let's talk" (primary button style)

  States:
    Default:    Border #E8E2DE, no shadow
    Focus:      Border color transitions to #F24B2E (200ms).
                A very subtle hand-drawn underline SVG can appear
                beneath the focused field (optional — simpler
                implementation: just the border color change)
    Filled:     Label remains visible above, input text #493B35
    Error:      Border color #F24B2E, small error message below field
                in #F24B2E, weight 500, 0.8rem. A tiny hand-drawn
                X or squiggle SVG next to the error text.
    Submit hover: Standard primary button hover state
    Submitting: Button text changes to "Sending..." with subtle
                opacity pulse
    Success:    Form replaced with a success message: "Got it. I'll
                be in touch soon." in weight 600, #493B35, with a
                hand-drawn checkmark doodle in #F24B2E

---------------------------------------------
4. RESPONSIVE BEHAVIOR
---------------------------------------------

BREAKPOINTS:
  Large (desktop):    >= 1024px
  Medium (tablet):    768px — 1023px
  Small (mobile):     < 768px

LARGE (DESKTOP, >= 1024px):
  - Full layout as described above
  - Content container: max-width 1200px, padding 2rem horizontal
  - Navigation: all links visible inline, CTA button visible
  - Hero headline: 3.5rem
  - Method steps: 2×2 grid
  - Stats: 4-column row
  - Testimonials: 3-column grid
  - About summary: 2-column (text + photo)
  - Hand-drawn SVG doodles at full density

MEDIUM (TABLET, 768px — 1023px):
  - Content container padding: 1.5rem horizontal
  - Navigation: can remain visible if space allows; otherwise
    collapse to hamburger at this breakpoint too (designer's call —
    5 links + CTA may fit tightly)
  - Hero headline: 2.75rem
  - Section padding: reduces to 5rem vertical
  - Method steps: 2×2 grid maintained, tighter gap (1.5rem)
  - Stats: 2×2 grid
  - Testimonials: 2-column grid
  - About summary: single column (photo above text, max-width 400px
    for photo)
  - Hand-drawn SVG doodles: reduce by ~20%, remove peripheral ones

SMALL (MOBILE, < 768px):
  - Content container padding: 1.25rem horizontal
  - Navigation: hamburger menu, full-screen overlay on open
  - Hero headline: 2.25rem, text-align center
  - All section headlines: scale down proportionally
  - Section padding: 4rem vertical
  - Body font size: 1rem (down from 1.125rem)
  - Method steps: single column, full width
  - Stats: 2×2 grid with 1rem gap
  - Testimonials: single column
  - About summary: single column, photo at top (full width, max 300px
    height, object-fit cover)
  - Hand-drawn SVG doodles: reduce by ~40%. Keep the most impactful
    ones (hero underline, stat circles, CTA arrows). Remove ambient
    scribbles and margin decorations.
  - CTA buttons: full width on mobile (display block)
  - Touch targets: minimum 44px height on all interactive elements

NAVIGATION RESPONSIVE:
  Desktop: Inline links + CTA button, right-aligned
  Tablet: If links fit — keep inline. If tight — hamburger.
  Mobile: Always hamburger. Full-screen overlay with centered links,
          generous spacing, CTA button prominent at bottom.

TESTIMONIAL RESPONSIVE:
  Desktop: 3-column grid
  Tablet: 2-column grid (if odd number, last card spans full width
          or stays single-column width — left-aligned, not centered)
  Mobile: Single column, full width. If more than 3 testimonials,
          show 3 with a "See more" link/button.

---------------------------------------------
5. INTERACTION & ANIMATION
---------------------------------------------

PAGE-LEVEL ANIMATIONS:
  Load behavior:     Content is server-rendered and visible immediately
                     (no skeleton/loading states for static pages).
                     Above-the-fold content (hero) has a subtle entrance:
                     headline fades up (300ms), subheadline fades up
                     (200ms delay), CTA fades up (400ms delay), SVG
                     doodles draw on (600ms, starting at 300ms).
                     Below-the-fold content uses scroll-triggered
                     animations (see below).

  Scroll behavior:   Sticky navigation. No parallax on content. SVG
                     doodle decorations in the hero can have a very
                     subtle parallax drift (move at 0.95x scroll speed)
                     but this is optional and should be skipped if it
                     affects performance.

  Page transitions:  Not required (standard page loads). If the site
                     is built as a SPA/Next.js app, a simple 200ms
                     crossfade between pages is sufficient.

SCROLL-TRIGGERED ANIMATIONS (apply to all sections below the fold):
  Trigger:           Element enters viewport (IntersectionObserver,
                     threshold ~0.15)
  Animation:         Fade up — translateY(20px) + opacity(0) →
                     translateY(0) + opacity(1)
  Duration:          500ms
  Easing:            ease-out (cubic-bezier 0.25, 0.46, 0.45, 0.94)
  Stagger:           For grouped elements (method cards, stat cards,
                     testimonial cards, list items): 100-150ms delay
                     between each item

SVG DOODLE DRAW-ON ANIMATION:
  Trigger:           Parent section enters viewport
  Animation:         Stroke-dasharray set to total path length,
                     stroke-dashoffset animates from path length to 0
  Duration:          600-800ms per doodle element
  Easing:            ease-in-out
  Stagger:           If multiple doodles in one section, stagger by
                     200ms

STAT COUNT-UP ANIMATION:
  Trigger:           Stats section enters viewport
  Animation:         Numbers count from 0 to final value. "3x" counts
                     0→3, "20%" counts 0→20, "2x" counts 0→2.
                     "Days" types in letter by letter.
  Duration:          800ms for number count, eased (starts slow, ends
                     snappy). "Days" typing: 400ms.
  Easing:            ease-out

COMPONENT ANIMATIONS:

  [Primary CTA Button]:
    Trigger:     Hover
    Animation:   Background color #F24B2E → #D93E23, translateY(-1px)
    Duration:    200ms
    Easing:      ease

  [Secondary CTA Link]:
    Trigger:     Hover
    Animation:   Arrow character translates 4px in its direction
    Duration:    200ms
    Easing:      ease

  [Nav Links]:
    Trigger:     Hover
    Animation:   Color #493B35 → #F24B2E
    Duration:    150ms
    Easing:      ease

  [Cards (Method, Testimonial)]:
    Trigger:     Hover
    Animation:   Border color shift toward #F24B2E at 30% opacity,
                 subtle box-shadow appears
    Duration:    200ms
    Easing:      ease

  [Form Inputs]:
    Trigger:     Focus
    Animation:   Border color #E8E2DE → #F24B2E
    Duration:    200ms
    Easing:      ease

  [Mobile Nav Overlay]:
    Trigger:     Hamburger tap
    Animation:   Overlay slides/fades in from top, links fade in
                 staggered (50ms delay between each, 200ms duration)
    Duration:    300ms for overlay, 200ms per link
    Easing:      ease-out

MICRO-INTERACTIONS:
  Buttons:       Hover lift (translateY -1px), press returns to 0
  Form submit:   On success, form fades out (200ms) and success
                 message fades in (300ms) with checkmark doodle
                 drawing on (400ms)
  Smooth scroll: "See how it works ↓" triggers smooth scroll to
                 the Problem section (600ms, ease-in-out)
  Active nav:    SVG squiggly underline on active page link draws
                 on when page loads (400ms)

PERFORMANCE NOTES:
  - All animations should respect prefers-reduced-motion: reduce.
    When active, disable all motion — instant state changes only,
    no scroll animations, no doodle draw-on effects.
  - SVG doodles should use will-change: stroke-dashoffset during
    animation only, removed after completion.
  - Intersection Observer for scroll triggers — no scroll event
    listeners.
  - All animations GPU-accelerated (transform + opacity only where
    possible).

---------------------------------------------
6. CONTENT & DATA STRUCTURE
---------------------------------------------

SAMPLE DATA:

  All content is provided in the companion copy document. The site
  is primarily static content — no dynamic data feeds, no CMS-driven
  listings, no user-generated content.

  Dynamic/variable content:
  - Testimonials: may be added or updated over time. Structure below.
  - Case studies: may be added over time. Structure below.
  - Contact form: submits to an email address (functional requirement).
  - TidyCal booking link: external embed or link.

DATA SHAPES:

  Testimonial:
    {
      quote: string,         // The testimonial text
      name: string,          // Client name
      role: string,          // Company and/or role title
      highlightNumbers: string[] // Any specific metrics mentioned
                                 // in the quote to visually emphasize
    }

  Case Study:
    {
      clientType: string,    // e.g., "Social media agency, 8 people"
      startingPoint: string, // Brief description of where they were
      challenge: string,     // The specific problem
      whatWeDid: string,     // Voice DNA method applied
      results: {
        metrics: [
          { value: string, label: string }  // e.g., { "3x", "revenue" }
        ],
        summary: string      // 1-2 sentence result narrative
      },
      clientQuote: string    // Pull quote from this client
    }

  Contact Form Submission:
    {
      name: string,
      email: string,
      agencyName: string,
      bottleneck: string     // Open text response
    }

  Method Step:
    {
      number: string,        // "01", "02", "03", "04"
      label: string,         // "SEQUENCE", "ENCODE", "REPLICATE", "VERIFY"
      headline: string,
      body: string,
      deliverable: string    // Only on How It Works detail page
    }

---------------------------------------------
7. IMPLEMENTATION NOTES
---------------------------------------------

PRIORITY ORDER:
  1. Global: Navigation, footer, typography system, color variables,
     CTA button component, section label/headline components
  2. Homepage hero section (first impression, most critical)
  3. Homepage remaining sections top-to-bottom
  4. SVG doodle decoration system (can be added as an enhancement
     layer after the structural layout is in place)
  5. How It Works detail page
  6. About page
  7. Results page (depends on Nic adding case studies/testimonials)
  8. Contact page + form functionality
  9. Scroll animations and micro-interactions (polish layer)
  10. Responsive refinement and mobile testing

KNOWN CONSTRAINTS:
  - Existing Next.js application — preserve all routing, state
    management, and business logic
  - Mobile-first: at least 60% of traffic will be mobile
  - Page load under 4 seconds — total SVG decoration payload must
    stay under 50KB, use system font stack as fallback while web
    fonts load, defer non-critical animations
  - Primary CTA links to TidyCal (external)
  - Contact form must deliver submissions to Nic's email
  - SEO basics: proper heading hierarchy (one h1 per page), meta
    titles and descriptions, alt text on any images, clean semantic
    HTML
  - SSL required
  - Google Analytics integration

  Copy rules (from brand document — DO NOT violate):
  - No em-dashes anywhere. Use commas or periods.
  - No corporate buzzwords
  - No generic AI hype language
  - No exclamation marks in headlines
  - Short paragraphs (2-3 sentences max)

OPEN QUESTIONS:
  - Photo of Nic: Does one exist for the About section? If so, the
    halftone treatment described in the spec should be applied. If
    not, the text-only layout works fine.
  - Testimonials: Content needs to be provided. The card structure
    is ready — just needs real quotes, names, and roles.
  - Case studies: Same — structure is defined, content pending.
  - TidyCal embed: Will this be a direct link to TidyCal, or an
    embedded widget on the Contact page? The spec assumes a link;
    adjust if embedding.
  - Font licensing: If using a premium font (Satoshi, General Sans),
    confirm licensing. Otherwise, fall back to Google Fonts (DM Sans
    or Outfit recommended).
  - SVG doodle creation: The implementing agent will need to either
    hand-create these SVG paths, source them from a hand-drawn SVG
    library, or generate them. They should look imperfect and human —
    not smooth vector art. If hand-drawing isn't feasible, a rough/
    sketchy SVG generation approach works. The key is the 2px stroke
    in #F24B2E with slightly wobbly paths.

PAGE-SPECIFIC NOTES:

  How It Works page:
    Same layout principles as homepage. Each of the 4 phases gets a
    full-width section with generous padding. Alternate backgrounds.
    The "Deliverable" line at the end of each phase should be styled
    as a distinct callout — a small tag-like element with background
    #F24B2E at 10% opacity, text in #F24B2E, weight 500, preceded
    by a label "Deliverable:" in the label style.

  About page:
    Single long-form narrative section. Max-width 720px. Same
    typography as body copy. Could benefit from a large decorative
    hand-drawn element in the background (a very large, faint
    scribble or DNA helix at ~3% opacity behind the text column).
    CTA at the bottom.

  Results page:
    Stats bar at top (same component as homepage). Case studies below
    in card or accordion format. Testimonials grid below case studies.
    CTA at bottom.

  Contact page:
    Minimal page. Headline + short copy + contact options (as inline
    text links, not a grid of icons) + the form below. Max-width
    600px for the entire contact content. Centered.

=============================================
END SPECIFICATION
=============================================