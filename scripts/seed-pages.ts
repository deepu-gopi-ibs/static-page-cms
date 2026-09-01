import type { Core } from "@strapi/strapi";

// Strapi v5 Blocks (rich text) node types
type TextNode = { type: "text"; text: string; bold?: boolean; italic?: boolean };
type LinkNode = { type: "link"; url: string; children: TextNode[] };
type InlineNode = TextNode | LinkNode;

type HeadingBlock = { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] };
type ParagraphBlock = { type: "paragraph"; children: InlineNode[] };
type ListItemBlock = { type: "list-item"; children: InlineNode[] };
type ListBlock = { type: "list"; format: "ordered" | "unordered"; children: ListItemBlock[] };
type Block = HeadingBlock | ParagraphBlock | ListBlock;

function h2(text: string): HeadingBlock {
  return { type: "heading", level: 2, children: [{ type: "text", text }] };
}
function h3(text: string): HeadingBlock {
  return { type: "heading", level: 3, children: [{ type: "text", text }] };
}
function p(...children: InlineNode[]): ParagraphBlock {
  return { type: "paragraph", children };
}
function txt(text: string, opts: { bold?: boolean; italic?: boolean } = {}): TextNode {
  return { type: "text", text, ...opts };
}
function link(url: string, label: string): LinkNode {
  return { type: "link", url, children: [{ type: "text", text: label }] };
}
function ul(...items: string[]): ListBlock {
  return {
    type: "list",
    format: "unordered",
    children: items.map((text) => ({ type: "list-item", children: [{ type: "text", text }] })),
  };
}
function ol(...items: string[]): ListBlock {
  return {
    type: "list",
    format: "ordered",
    children: items.map((text) => ({ type: "list-item", children: [{ type: "text", text }] })),
  };
}

// ─── Page 1: Travel Preparation ────────────────────────────────────────────────

const travelPreparationContent = [
  {
    __component: "page.page-header",
    title: "Travel Preparation Guide",
    subHeading:
      "Everything you need to know before you board — documents, packing tips, and health essentials.",
  },
  {
    __component: "content.rich-text",
    content: [
      h2("Required Travel Documents"),
      p(
        txt(
          "Before your journey, ensure all your travel documents are valid and up to date. Lost or expired documents can result in denied boarding or entry. Check the "
        ),
        link("https://www.iata.org/en/publications/timatic/", "IATA Travel Centre"),
        txt(" for the latest entry requirements for your destination.")
      ),
      ul(
        "Valid passport (minimum 6 months validity beyond travel dates)",
        "Visa or Electronic Travel Authorisation (ETA) if required",
        "Return or onward travel ticket",
        "Proof of accommodation (hotel booking confirmation)",
        "Travel insurance certificate with emergency medical cover",
        "Yellow fever vaccination certificate if travelling to affected regions"
      ),
      h3("Travelling with Children"),
      p(
        txt(
          "Minors travelling alone or with one parent may require additional documentation such as a notarised parental consent letter. Ensure birth certificates are available for children under 16."
        )
      ),
    ] as Block[],
  },
  {
    __component: "content.card-grid",
    title: "Top Preparation Tips",
    Card: [
      {
        title: "Check-in Early",
        link: "/help/check-in",
      },
      {
        title: "Baggage Allowance",
        link: "/fare-information#baggage",
      },
      {
        title: "Airport Transfers",
        link: "/help/airport-transfers",
      },
      {
        title: "Seat Selection",
        link: "/manage/seat-selection",
      },
      {
        title: "Special Assistance",
        link: "/help/special-assistance",
      },
      {
        title: "Meal Preferences",
        link: "/manage/meal-preferences",
      },
    ],
  },
  {
    __component: "content.rich-text",
    content: [
      h2("Health & Wellbeing"),
      p(
        txt(
          "Long-haul flights can be tiring. Staying hydrated and moving regularly reduces the risk of deep vein thrombosis (DVT). We recommend the following practices:"
        )
      ),
      ul(
        "Drink at least 250 ml of water per hour of flight",
        "Avoid excessive alcohol or caffeine before and during your flight",
        "Stand up and walk the aisle every 1–2 hours",
        "Wear compression socks for flights over 4 hours",
        "Carry any prescription medication in your hand luggage with a doctor's note"
      ),
      h3("Jet Lag Advice"),
      p(
        txt(
          "Adjust your sleeping schedule 2–3 days before departure. Expose yourself to natural light upon arrival and avoid napping for more than 20 minutes during the first day at your destination."
        )
      ),
    ] as Block[],
  },
  {
    __component: "content.content-table",
    columns: [
      { Cell: "Item" },
      { Cell: "Carry-on Allowed" },
      { Cell: "Checked Baggage Allowed" },
      { Cell: "Notes" },
    ],
    cellValue: [
      { cellValue: "Liquids (≤100 ml each)" },
      { cellValue: "Yes — in 1 L clear bag" },
      { cellValue: "Yes — no restriction on size" },
      { cellValue: "TSA/airport security rules apply" },
    ],
  },
];

// ─── Page 2: Fare Information ───────────────────────────────────────────────────

const fareInformationContent = [
  {
    __component: "page.page-header",
    title: "Fare Information",
    subHeading:
      "Clear, transparent pricing across all ticket classes. Find the fare that suits your journey.",
  },
  {
    __component: "content.content-table",
    columns: [
      { Cell: "Fare Class" },
      { Cell: "Base Fare (from)" },
      { Cell: "Checked Bag" },
      { Cell: "Seat Selection" },
      { Cell: "Changes" },
    ],
    cellValue: [
      { cellValue: "Economy Lite" },
      { cellValue: "€49" },
      { cellValue: "Not included" },
      { cellValue: "Paid" },
      { cellValue: "Non-refundable" },
    ],
  },
  {
    __component: "content.rich-text",
    content: [
      h2("Understanding Our Fare Classes"),
      p(
        txt(
          "We offer four distinct fare classes designed to match different travel needs and budgets. All fares include a personal item (40 × 30 × 15 cm) at no extra charge."
        )
      ),
      h3("Economy Lite"),
      p(
        txt(
          "Our most affordable option. Ideal for travellers packing light and looking for the lowest base price. Seat selection and checked baggage are available as paid add-ons."
        )
      ),
      h3("Economy Standard"),
      p(
        txt(
          "Includes one 23 kg checked bag and complimentary seat selection in standard rows. Changes permitted for a fee up to 48 hours before departure."
        )
      ),
      h3("Economy Flex"),
      p(
        txt(
          "Fully flexible ticket allowing free same-day changes and one free rebooking. Includes priority boarding and a 23 kg checked bag. Partial refunds available on cancellation."
        )
      ),
      h3("Business Class"),
      p(
        txt(
          "Enjoy lie-flat seats on long-haul routes, dedicated check-in, lounge access, and two 32 kg checked bags. Full refunds available up to departure time."
        )
      ),
      p(
        txt("Compare all fare classes in detail on our "),
        link("/fares/compare", "Fare Comparison page"),
        txt(".")
      ),
    ] as Block[],
  },
  {
    __component: "content.card-grid",
    title: "Add-On Services",
    Card: [
      {
        title: "Extra Checked Bag",
        link: "/add-ons/baggage",
      },
      {
        title: "Priority Boarding",
        link: "/add-ons/priority-boarding",
      },
      {
        title: "Lounge Access",
        link: "/add-ons/lounge",
      },
      {
        title: "In-Flight Meals",
        link: "/add-ons/meals",
      },
      {
        title: "Travel Insurance",
        link: "/add-ons/insurance",
      },
    ],
  },
  {
    __component: "content.rich-text",
    content: [
      h2("Refund & Change Policy"),
      p(
        txt(
          "Our change and refund policies vary by fare class. The following general rules apply across all tickets:"
        )
      ),
      ul(
        "Name corrections (up to 3 characters) are free within 24 hours of booking",
        "Date changes are subject to fare difference plus an applicable change fee",
        "Economy Lite tickets are non-refundable; taxes may be reclaimed",
        "Economy Flex and Business Class fares support full fare refunds",
        "Refunds are processed within 7–10 business days to the original payment method"
      ),
      h3("24-Hour Risk-Free Cancellation"),
      p(
        txt(
          "All tickets purchased more than 7 days before departure qualify for free cancellation within 24 hours of booking. A full refund is issued automatically."
        )
      ),
      p(
        txt("For full policy details, visit our "),
        link("/help/refunds", "Refunds & Changes Help Centre"),
        txt(".")
      ),
    ] as Block[],
  },
];

// ─── Page 3: Online Payment ─────────────────────────────────────────────────────

const onlinePaymentContent = [
  {
    __component: "page.page-header",
    title: "Online Payment",
    subHeading:
      "Fast, secure, and convenient — pay for your flights and extras using your preferred method.",
  },
  {
    __component: "content.card-grid",
    title: "Accepted Payment Methods",
    Card: [
      {
        title: "Visa / Mastercard",
        link: "/payment/card",
      },
      {
        title: "American Express",
        link: "/payment/amex",
      },
      {
        title: "PayPal",
        link: "/payment/paypal",
      },
      {
        title: "Apple Pay",
        link: "/payment/apple-pay",
      },
      {
        title: "Google Pay",
        link: "/payment/google-pay",
      },
      {
        title: "Bank Transfer",
        link: "/payment/bank-transfer",
      },
    ],
  },
  {
    __component: "content.content-table",
    columns: [
      { Cell: "Payment Method" },
      { Cell: "Processing Fee" },
      { Cell: "Currencies Supported" },
      { Cell: "Instant Confirmation" },
    ],
    cellValue: [
      { cellValue: "Visa / Mastercard" },
      { cellValue: "1.5%" },
      { cellValue: "EUR, USD, GBP, AED, SGD" },
      { cellValue: "Yes" },
    ],
  },
  {
    __component: "content.rich-text",
    content: [
      h2("How to Complete Your Payment"),
      p(
        txt(
          "Paying for your booking online takes just a few minutes. Follow these steps to complete your transaction securely:"
        )
      ),
      ol(
        "Select your flights and add-ons in the booking flow",
        "Review your itinerary and total price on the summary page",
        "Choose your preferred payment method from the list",
        "Enter your payment details in the secure checkout form",
        "Confirm and submit — your booking reference will appear instantly",
        "Check your email for an e-ticket and booking confirmation"
      ),
      h3("Instalment Payments"),
      p(
        txt(
          "Eligible bookings can be split into monthly instalments at 0% interest through our partner "
        ),
        link("https://www.klarna.com", "Klarna"),
        txt(
          ". Select 'Pay in 3' at checkout. Available for bookings over €150 in participating countries."
        )
      ),
      h3("Currency & Conversion"),
      p(
        txt(
          "Prices are displayed in your local currency based on your location. If your card is charged in a different currency, your bank's exchange rate applies. We recommend selecting a card with no foreign transaction fees."
        )
      ),
    ] as Block[],
  },
  {
    __component: "content.rich-text",
    content: [
      h2("Payment Security"),
      p(
        txt(
          "Your financial data is protected at every step. Our payment infrastructure is certified to PCI DSS Level 1 — the highest standard in the payments industry."
        )
      ),
      ul(
        "All transactions are encrypted using TLS 1.3",
        "We never store your full card number on our servers",
        "3D Secure (3DS2) authentication is required for all card payments",
        "Real-time fraud detection monitors every transaction",
        "Two-factor authentication available for account-based payments"
      ),
      h3("Payment Declined?"),
      p(
        txt(
          "If your payment is declined, please check the following before retrying:"
        )
      ),
      ul(
        "Ensure your card has sufficient funds or credit limit",
        "Verify your billing address matches your bank records",
        "Contact your bank — some international transactions require pre-authorisation",
        "Try an alternative payment method",
        "Clear your browser cache and cookies, then attempt again"
      ),
      p(
        txt("If you continue to experience issues, contact our "),
        link("/help/contact", "support team"),
        txt(" available 24/7.")
      ),
    ] as Block[],
  },
];

export async function seedPages(strapi: Core.Strapi) {
  const pages = [
    {
      title: "Travel Preparation",
      slug: "travel-preparation",
      content: travelPreparationContent,
    },
    {
      title: "Fare Information",
      slug: "fare-information",
      content: fareInformationContent,
    },
    {
      title: "Online Payment",
      slug: "online-payment",
      content: onlinePaymentContent,
    },
  ];

  for (const page of pages) {
    // Check if page already exists
    const existing = await strapi.documents("api::page.page").findMany({
      filters: { slug: page.slug },
    });

    if (existing.length > 0) {
      strapi.log.info(`[seed] Page "${page.title}" already exists — skipping.`);
      continue;
    }

    const created = await strapi.documents("api::page.page").create({
      data: {
        title: page.title,
        slug: page.slug,
        content: page.content,
      } as Parameters<ReturnType<Core.Strapi["documents"]>["create"]>[0]["data"],
    });

    await strapi.documents("api::page.page").publish({
      documentId: created.documentId,
    });

    strapi.log.info(`[seed] Created and published page: "${page.title}" (${page.slug})`);
  }
}
