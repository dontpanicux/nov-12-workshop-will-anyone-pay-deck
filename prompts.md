# Prompts: Will anyone pay for your product?

Bolt.new workshop, Thursday, Nov 12. Run them in this order. Every color pairing in the design directions passes WCAG AA contrast.

## Prompt 1: the test page (Clearcount Bookkeeping demo)

Paste into a new Bolt.new project.

```
Context: I run Clearcount Bookkeeping, a two-person bookkeeping practice. I want to test a new service before I hire anyone: Tax-Ready Catch-Up, where we clean up months of overdue books and hand them to the client's CPA. This is a one-page validation test, not a full website.

Buyer: Small-business owners whose books are months behind. Their problem: tax season is coming, and their CPA won't start until the books are clean.

Goal: Get an owner to (1) join a waitlist and (2) pick the price they'd choose.

Build one mobile-first page, in this order:
- Hero: a headline about getting books ready for their CPA before tax season, one supporting line, and one small trust line: "From a two-person practice that keeps the books for 40 small businesses." The waitlist form sits beside it on desktop and right below it on phones, so there's no separate "Join the waitlist" button.
- Waitlist form: name, email, and one required question, "How many months behind are your books?" (0–3, 4–6, 7–12, 12+), shown as four tappable options, with a "Join the waitlist" button. Name, email, and the question are required, and the email must look valid. After someone joins, replace the form with a short thank-you.
- Pricing section titled "Planned pricing. Pick the one you'd choose." with three options of equal weight, each with a "Choose this" button:
  - Name "Catch-up", price "$750", description "Up to 6 months of books"
  - Name "Tax-ready in 10 days", price "$1,200", description "Up to 12 months, sent to your CPA"
  - Name "Catch-up + monthly", price "$350/month", description "Catch-up included, books kept current"
- Clicking a price opens a "Not live yet" screen that moves through three steps, replacing its contents each time:
  1. "Tax-Ready Catch-Up isn't taking clients yet. Join the waitlist to get first access at this price." Show the chosen option and the same waitlist form, including the required months-behind question, with a button that says "Join at" plus the price, like "Join at $1,200". No feedback question in this step.
  2. One optional question: "What's stopping you from catching up on your books?" as tappable options they can pick more than one of: "No time during the busy season", "Don't know where to start", "Too far behind to fix myself", "Hard to find someone I trust", and "Other" with a short text box. Buttons: "Send" and "Skip".
  3. A thank-you: "You're on the list at" plus the chosen price, like "You're on the list at $1,200.", with a Close button.
  Skip steps a visitor has already done: if they already joined, save the price click and go straight to step 2. Ask the question only once per visitor; if they already answered, go straight to step 3. Visitors can't read the table, so remember in localStorage whether they joined, their email, and whether they answered, and include that email on their feedback row.
- Footer: the business name and hello@clearcount.example

Data: Save everything to one database table called responses with columns: created_at, event_type (visit, price_click, signup, feedback), name, email, qualifier, price_choice, feedback, source, visitor_id, is_example (true/false, default false), is_live (true/false, default false). Write one helper, getVisitorId(): read localStorage key "visitor_id"; if it's missing, create one with crypto.randomUUID() and save it; return it. Every insert into responses uses getVisitorId(). Don't use sessionStorage or window.name. Set is_live to true on every row saved from the published site and false on rows saved from the Bolt.new preview, decided by the page's hostname. Each action adds exactly one row, and rows are never updated: a visit each time the page loads; a price_click for each "Choose this" click and nothing else; a signup for each join, with name, email, qualifier, and the price they joined at (empty if they joined from the main form); and a feedback row with their email and picks when they press Send on the optional question. Skip saves nothing. Save qualifier, price_choice, and feedback as the exact labels shown on the page, like "4–6" and "Tax-ready in 10 days", never as codes. price_choice is the option name only, without the price or description. Save multiple feedback picks separated by commas, and any "Other" text after them. Read source from a ?src= URL parameter (for example ?src=list or ?src=linkedin) and default to "direct". Visitors can add rows but can't read, change, or delete them.

Design direction (follow exactly):
- Feel: calm, precise, and trustworthy, like a well-kept ledger. The visitor is a stressed business owner, so the page should feel like the opposite of their books.
- Fonts from Google Fonts: Source Serif 4 (semibold) for headings, Public Sans for everything else. Use tabular numbers for every price.
- Colors: page #F5F7F6, form surface #FFFFFF, text #0F1F1A, secondary text #4A5A53, hairline rules #D5DDD8, and one accent #1F6F50 for buttons, links, and the selected option only.
- Layout: center the whole page in a 1120px container with 32px side padding, never pinned to the left edge. On desktop, put the hero copy on the left and the waitlist form card on the right, side by side, and stack them on phones. Text stays left-aligned inside the container, body lines no wider than 640px, about 96px between sections on desktop and 64px on phones. Headline 48px on desktop and 34px on phones, on two or three lines.
- Pricing is the one memorable element: show it as a ledger, not cards, spanning the full container width. Three rows split by hairline rules, with the name and one-line description on the left, the price right-aligned, and the button at the end of the row. On phones, stack each row and make the button full width.
- Buttons: solid accent with white text, 8px corners, at least 48px tall, with a visible focus ring.
- Motion: nothing animates on load. Only the "Not live yet" screen slides up when a price is clicked.
- Avoid: gradients, gradient text, glass effects, shadows on every element, emoji, decorative icons, stock photos, a hero image, testimonials, logo strips, stats rows, all-caps labels, centered paragraphs, purple or indigo, arrows on buttons, and em dashes in any page copy.

Do not build: logins, booking, payments, a logo, extra pages, or an admin dashboard.
```

## Prompt 1: your version (fill in the brackets)

Replace everything in [brackets], including the design direction, then paste into a new Bolt.new project.

```
Context: I [run / am starting] [BUSINESS NAME], [ONE LINE ON WHAT YOU DO]. I want to test [NEW OFFER] before I build anything else. This is a one-page validation test, not a full website.

Buyer: [WHO YOU SELL TO]. Their problem: [THE PROBLEM, IN THEIR WORDS].

Goal: Get a visitor to (1) join a waitlist and (2) pick the price they'd choose.

Build one mobile-first page, in this order:
- Hero: a headline about [THE RESULT THEY WANT] and one supporting line. The waitlist form sits beside it on desktop and right below it on phones, so there's no separate "Join the waitlist" button.
- Waitlist form: name, email, and one required question that tells me who to call first: "[QUALIFYING QUESTION]" ([3–4 ANSWER OPTIONS]), shown as tappable options, with a "Join the waitlist" button. Name, email, and the question are required, and the email must look valid. After someone joins, replace the form with a short thank-you.
- A pricing section titled "Planned pricing. Pick the one you'd choose." with [two or three] options of equal visual weight, each with a "Choose this" button:
  - Name "[OPTION 1 NAME]", price "[PRICE]", description "[ONE LINE]"
  - Name "[OPTION 2 NAME]", price "[PRICE]", description "[ONE LINE]"
  - Name "[OPTION 3 NAME]", price "[PRICE]", description "[ONE LINE]"
- Clicking a price opens a "Not live yet" screen that moves through three steps, replacing its contents each time:
  1. "[OFFER NAME] isn't available yet. Join the waitlist to get first access at this price." Show the chosen option and the same waitlist form, including the required qualifying question, with a button that says "Join at" plus the price. No feedback question in this step.
  2. One optional question: "[WHAT'S STOPPING YOU FROM SOLVING THIS TODAY?]" as tappable options they can pick more than one of: [4 LIKELY REASONS], and "Other" with a short text box. Buttons: "Send" and "Skip".
  3. A thank-you that names the price they picked, with a Close button.
  Skip steps a visitor has already done: if they already joined, save the price click and go straight to step 2. Ask the question only once per visitor; if they already answered, go straight to step 3. Visitors can't read the table, so remember in localStorage whether they joined, their email, and whether they answered, and include that email on their feedback row.
- Footer: the business name and [CONTACT EMAIL]

Data: Save everything to one database table called responses with columns: created_at, event_type (visit, price_click, signup, feedback), name, email, qualifier, price_choice, feedback, source, visitor_id, is_example (true/false, default false), is_live (true/false, default false). Write one helper, getVisitorId(): read localStorage key "visitor_id"; if it's missing, create one with crypto.randomUUID() and save it; return it. Every insert into responses uses getVisitorId(). Don't use sessionStorage or window.name. Set is_live to true on every row saved from the published site and false on rows saved from the Bolt.new preview, decided by the page's hostname. Each action adds exactly one row, and rows are never updated: a visit each time the page loads; a price_click for each "Choose this" click and nothing else; a signup for each join, with name, email, qualifier, and the price they joined at (empty if they joined from the main form); and a feedback row with their email and picks when they press Send on the optional question. Skip saves nothing. Save qualifier, price_choice, and feedback as the exact labels shown on the page, never as codes. price_choice is the option name only, without the price or description. Save multiple feedback picks separated by commas, and any "Other" text after them. Read source from a ?src= URL parameter and default to "direct". Visitors can add rows but can't read, change, or delete them.

Design direction (follow exactly):
[PASTE DIRECTION A, B, OR C]
- Motion: nothing animates on load. Only the "Not live yet" screen slides up when a price is clicked.
- Avoid: gradients, gradient text, glass effects, shadows on every element, emoji, decorative icons, stock photos, a hero image, testimonials, logo strips, stats rows, all-caps labels, centered paragraphs, purple or indigo, arrows on buttons, and em dashes in any page copy.

Do not build: logins, booking, payments, a logo, extra pages, or an admin dashboard.
```

## Design direction A: calm and precise

Best for finance, legal, consulting, and other B2B services. Paste into the [PASTE DIRECTION A, B, OR C] bracket.

```
- Feel: calm, precise, and trustworthy.
- Fonts from Google Fonts: Source Serif 4 (semibold) for headings, Public Sans for everything else. Use tabular numbers for every price.
- Colors: page #F5F7F6, surface #FFFFFF, text #0F1F1A, secondary text #4A5A53, hairline rules #D5DDD8, and one accent #1F6F50 for buttons, links, and the selected option only.
- Layout: center the whole page in a 1120px container, never pinned to the left edge. On desktop, put the hero copy and the waitlist form side by side, stacked on phones. Text stays left-aligned inside the container, body lines no wider than 640px, and the headline sits on two or three lines.
- The one memorable element: pricing as a ledger. Rows split by hairline rules, price right-aligned, one button per row.
- Buttons: solid accent with white text, 8px corners, at least 48px tall, with a visible focus ring.
```

## Design direction B: warm and local

Best for trades, food, home, retail, and local services.

```
- Feel: friendly, local, and dependable.
- Fonts from Google Fonts: Bricolage Grotesque (bold) for headings, Figtree for everything else.
- Colors: page #FFFFFF, surface #F1F3EE, text #22201C, secondary text #57534B, rules #E2E0DA, buttons #22201C with white text, and one highlight #F2C230 for the selected option only.
- Layout: center the whole page in a 1120px container, never pinned to the left edge. On desktop, put the hero copy and the waitlist form side by side, stacked on phones. Headline up to 900px wide, body text no wider than 640px, left-aligned inside the container.
- The one memorable element: a large, plain-spoken headline that names your town or service area.
- Buttons: dark with white text, fully rounded, at least 52px tall, with a visible focus ring.
```

## Design direction C: bold and modern

Best for creative work, fitness, events, and coaching.

```
- Feel: confident, energetic, and modern.
- Fonts from Google Fonts: Archivo for everything, headings at 800 weight with tight letter spacing, body at 400.
- Colors: page #FFFFFF, surface #F3F3F1, text #101010, secondary text #55555A, rules #E4E4E2, and one accent #C42D5C for buttons and the selected option only.
- Layout: center the whole page in a 1120px container, never pinned to the left edge. An oversized headline (72px desktop, 44px phone) spans the container, then the hero copy and waitlist form sit side by side on desktop, stacked on phones.
- The one memorable element: the headline. Keep everything else quiet.
- Buttons: solid accent with white text, 4px corners, at least 52px tall, with a visible focus ring.
```

## Design pass 1: strip the AI look

Run after Prompt 1 if the page looks generic. One pass per prompt.

```
Remove anything decorative that doesn't help a visitor join the waitlist or pick a price. Remove gradients, gradient text, glass effects, emoji, decorative icons, extra shadows, fade-in or slide-up animations on page sections, all-caps labels, and any section I didn't ask for. Keep the content and features the same. Then list what you removed.
```

## Design pass 2: fix the type

```
Improve the typography only. Don't change content, layout, or features. Set a clear scale: headline 48px desktop and 34px phone, section headings 28px, body 18px with 1.6 line height, small text 15px. Keep body lines under 70 characters. Use tabular numbers for prices. Make every text color pass WCAG AA contrast on its background.
```

## Design pass 3: make prices easy to compare

```
Redesign only the pricing section. Give every option equal weight, with no "most popular" badge and no highlighted plan. Line up names, one-line descriptions, and prices so they're easy to compare, with prices in tabular numbers and one "Choose this" button per option. On phones, stack each option and make its button full width.
```

## Design pass 4: polish the states

```
Polish interaction states without changing the layout. Add visible focus rings on every input and button. Show errors under the field that say how to fix them, like "Enter an email like name@company.com". Show a saving state on the submit button, then a thank-you message in place of the form. Let the "Not live yet" screen close with Escape or a close button, and respect reduced motion.
```

## Prompt 2: private results page

Paste into the same project. Use a real email you can receive mail at, then create your account right away. Swap in your own bars.

```
Add a private results page at /results. Don't link it from the main page, and don't log a visit when it loads. Count only rows where is_live or is_example is true, so tests from the Bolt.new preview never show up.

Access:
- Add email and password sign-in to /results. Only allow sign-up with [YOUR EMAIL], and reject any other email with "This page is private."
- Only a signed-in user with the email [YOUR EMAIL] can read the responses table. Visitors can still only add rows. Read the table only after sign-in finishes, and if the read fails, show the error on the page instead of zeros.
- If someone signs in with any other email, show "This page is private." and a Sign out button.

What to show:
- Four pass-bar rows: Visits (bar: 100), Waitlist signups (bar: 10), Qualified signups, meaning qualifier is 4–6, 7–12, or 12+ (bar: 5), and Price clicks (bar: 5). Each row shows the count and the bar, plus a horizontal bar drawn with plain elements that fills from zero on load and is full once the count meets the bar. A passing row turns the accent color and shows a small "Pass" label.
- Count visits as unique visitor_id values, so refreshes never inflate them. Count signups and qualified signups by unique email. The sign-up rate is unique signups divided by visits.
- Sign-up rate: as a percent, in one large 64px serif number, with a line like "16 signups / 140 visits" under it. It's the only large number on the page. With no sign-ups yet, show "0%" with "No sign-ups yet" under it in small secondary text.
- Favorite price: price clicks grouped by price_choice, highest first, as a ledger with hairline rules. Show each option's price next to its name, like "Catch-up, $750".
- Top reasons: from feedback rows, how many unique emails picked each option, highest first, as a ledger. Under it, list any "Other" answers word for word.
- By source: a ledger table with visits (unique visitor_id), signups (unique email), and sign-up rate for each source, numbers right-aligned in tabular figures.
- If any rows have is_example set to true, show a small "Example data" tag next to the page title: pale accent background, no border, not clickable.
- A Sign out button at the bottom.

Layout:
- Same fonts, colors, and button style as the main page.
- A centered 1120px container, never pinned to the left edge, that fits the key numbers on one laptop screen: the pass-bar rows on the left (about 60%), the sign-up rate, Favorite price, and Top reasons on the right (about 40%), and the source table full width below.
- Section titles small and quiet: the body font, 15px, semibold, secondary text color. Use the serif only for the page title and the large number.

Do not build: filters, date pickers, a chart library, or exports.
```

## Bonus: practice data

Replaces every row with example data. Run after Prompt 2 and before you share your link.

```
Replace everything in the responses table with example data so I can practice reading my results. Delete every existing row first, then add the rows below with is_example set to true. Don't change the page.

Spread all rows across the last 14 days:
- 140 visit rows, each with its own visitor_id: 34 with source list, 72 linkedin, 34 google
- 16 signup rows with realistic names and emails: 8 from list, 5 linkedin, 3 google. Set qualifier to 0–3 on six rows, 4–6 on six rows, 7–12 on three rows, and 12+ on one row
- 8 feedback rows using the emails of eight of those signups: "No time during the busy season" picked five times, "Too far behind to fix myself" four times, "Don't know where to start" twice, and "Other" with "My CPA keeps asking and I keep stalling" once (some rows have more than one pick)
- 11 price_click rows: price_choice "Tax-ready in 10 days" on seven, "Catch-up" on three, "Catch-up + monthly" on one
```

## Bonus: clear every row before launch

Run right before you share your link for real. It removes example data and any test rows from the published page.

```
Delete every row in the responses table, including example data and my own test visits. Don't change the page or the table.
```

## Bonus: phone check

Run before you share any link from social media.

```
Make every screen work on a phone 375 pixels wide: the main page, the "Not live yet" screen, and /results. Fix anything that's cut off, overlapping, too small to tap, or makes the page scroll sideways. On /results, stack the columns in this order: sign-up rate, pass bars, Favorite price, Top reasons, then the source table. Keep the desktop layout the same.
```
