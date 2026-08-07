export const articleCategories = [
  "All",
  "Getting Started",
  "SEO and Google",
  "Costs",
  "Industry Guides",
] as const

export type ArticleCategory = (typeof articleCategories)[number]

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "blockquote"; text: string }

export interface ArticleRecord {
  slug: string
  title: string
  category: Exclude<ArticleCategory, "All">
  excerpt: string
  readTime: string
  publishDate: string
  body: ContentBlock[]
}

export const articles: ArticleRecord[] = [
  {
    slug: "website-needs-2026",
    title: "What a Small Business Website Actually Needs in 2026",
    category: "Getting Started",
    excerpt:
      "Most sites fail on three basics before anything fancier matters. Here is what to get right first.",
    readTime: "6 min",
    publishDate: "January 2026",
    body: [
      { type: "heading", text: "The non-negotiables" },
      {
        type: "paragraph",
        text: "A small business website needs to do three things well: load fast on a phone, say clearly what you do, and make it easy to get in touch. Everything else is optional until those three are solid.",
      },
      {
        type: "list",
        items: [
          "A clear headline that says what you do and for whom",
          "Contact details that work: phone, Messenger, email",
          "Fast loading on mobile data, not just wifi",
          "A way to see your prices or get a quote",
        ],
      },
      { type: "heading", text: "What you can skip at first" },
      {
        type: "paragraph",
        text: "Blogs, elaborate animations, and a dozen extra pages rarely move the needle before you have the basics right. [Expand this section with your own perspective on what your market actually skips.]",
      },
      { type: "heading", text: "The real cost of skipping the basics" },
      {
        type: "paragraph",
        text: "A website that loads slowly or hides the phone number does not save money — it just moves the cost to lost inquiries. See our [template gallery](/templates) for real examples across industries.",
      },
    ],
  },
  {
    slug: "website-cost-philippines",
    title: "How Much Should a Website Cost in the Philippines?",
    category: "Costs",
    excerpt:
      "Agency quotes swing wildly. Here is what actually drives the price, and a realistic range to expect.",
    readTime: "7 min",
    publishDate: "January 2026",
    body: [
      { type: "heading", text: "What actually drives the price" },
      {
        type: "paragraph",
        text: "Agency quotes swing from a few thousand pesos to well over forty thousand, and the difference usually comes down to hours: custom design work, copywriting, and revision cycles all take time that AI-assisted workflows can compress.",
      },
      { type: "heading", text: "A rough range to expect" },
      {
        type: "list",
        items: [
          "Template-based one-pager: PHP 10,000–15,000",
          "Multi-page site with custom sections: PHP 15,000–20,000",
          "Fully custom build with copywriting: PHP 20,000 and up",
        ],
      },
      {
        type: "blockquote",
        text: "Get a written quote before you agree to anything — a price without a scope is not really a price.",
      },
      { type: "heading", text: "Questions to ask before you pay" },
      {
        type: "paragraph",
        text: "[List the specific questions you recommend clients ask, based on your own experience.] Check our [published pricing](/pricing) to compare against any quote you receive.",
      },
    ],
  },
  {
    slug: "domain-hosting-explained",
    title: "Domain and Hosting, Explained Without Jargon",
    category: "Getting Started",
    excerpt:
      "Two terms that confuse almost everyone, explained in plain language with no technical background needed.",
    readTime: "5 min",
    publishDate: "February 2026",
    body: [
      { type: "heading", text: "What a domain actually is" },
      {
        type: "paragraph",
        text: "Your domain is the address people type to find you — think of it as renting a specific street address on the internet, renewed yearly.",
      },
      { type: "heading", text: "What hosting actually is" },
      {
        type: "paragraph",
        text: "Hosting is the server space where your website's files live. Without it, your domain points to nothing.",
      },
      { type: "heading", text: "What is included in your package" },
      {
        type: "paragraph",
        text: "[Explain exactly what domain and hosting terms apply to your packages here.]",
      },
    ],
  },
  {
    slug: "google-business-profile-setup",
    title: "Setting Up Your Google Business Profile the Right Way",
    category: "SEO and Google",
    excerpt:
      "For local searches, this often shows up before your website does. Here is how to set it up properly.",
    readTime: "6 min",
    publishDate: "February 2026",
    body: [
      { type: "heading", text: "Why it matters more than most people think" },
      {
        type: "paragraph",
        text: "For local searches, your Google Business Profile often shows up before your actual website does — it is frequently the first impression.",
      },
      { type: "heading", text: "The setup checklist" },
      {
        type: "list",
        items: [
          "Verify your business address or service area",
          "Add real photos, not stock images",
          "Fill in hours, category and services accurately",
          "Respond to every review, good or bad",
        ],
      },
      { type: "heading", text: "Keeping it accurate over time" },
      {
        type: "paragraph",
        text: "[Add your own guidance on maintaining the listing after launch.]",
      },
    ],
  },
  {
    slug: "facebook-page-not-enough",
    title: "Why Your Facebook Page Is Not Enough on Its Own",
    category: "Getting Started",
    excerpt:
      "Facebook is the incumbent, not the enemy. Here is exactly where it falls short and how to fill the gap.",
    readTime: "5 min",
    publishDate: "March 2026",
    body: [
      { type: "heading", text: "What Facebook does well" },
      {
        type: "paragraph",
        text: "A Facebook Page is fast to set up and meets customers where they already are — that is exactly why so many businesses start there.",
      },
      { type: "heading", text: "What it cannot do" },
      {
        type: "list",
        items: [
          "Show up reliably in Google search results",
          "Hold your prices and credentials in one permanent place",
          "Look fully professional to someone comparing options",
        ],
      },
      { type: "heading", text: "The two working together" },
      {
        type: "paragraph",
        text: "The strongest setup keeps the Facebook Page for conversation and adds a proper website for credibility and search visibility. [Add specifics from your own experience here.]",
      },
    ],
  },
  {
    slug: "clinic-dental-website-checklist",
    title: "A Website Checklist for Clinics and Dental Practices",
    category: "Industry Guides",
    excerpt:
      "What to include, what to leave out, and how to stay within professional advertising guidelines.",
    readTime: "8 min",
    publishDate: "March 2026",
    body: [
      { type: "heading", text: "What to include" },
      {
        type: "list",
        items: [
          "Doctor or dentist credentials and specialties",
          "Clear services list",
          "Insurance and accreditation information",
          "Clinic hours and a map",
          "An appointment request form",
        ],
      },
      { type: "heading", text: "What to leave out" },
      {
        type: "paragraph",
        text: "Philippine professional ethics rules restrict advertising and solicitation for medical and dental practices — keep the copy informational, not promotional. [Verify current PRC guidance before publishing.]",
      },
      { type: "heading", text: "A note on photos" },
      {
        type: "paragraph",
        text: "[Add guidance on what kind of clinic photography works best.]",
      },
    ],
  },
  {
    slug: "restaurant-cafe-website-guide",
    title: "What Restaurants and Cafes Should Put on Their Website",
    category: "Industry Guides",
    excerpt:
      "Menu, photos and hours do more work than a long about page. Here is what actually earns a visit.",
    readTime: "6 min",
    publishDate: "April 2026",
    body: [
      { type: "heading", text: "The essentials" },
      {
        type: "list",
        items: [
          "A current menu with prices",
          "Photos of the food and space",
          "Hours, location and a map",
          "A reservation or inquiry option",
        ],
      },
      { type: "heading", text: "What actually gets clicks" },
      {
        type: "paragraph",
        text: "Food photography and an easy-to-read menu do more work than a long about page. [Add your own observations here.]",
      },
      { type: "heading", text: "Keeping it current" },
      {
        type: "paragraph",
        text: "[Explain how often you recommend updating seasonal menu items.]",
      },
    ],
  },
  {
    slug: "seo-basics-local-business",
    title: "SEO Basics: What Actually Moves the Needle for a Local Business",
    category: "SEO and Google",
    excerpt:
      "No keyword stuffing, no shortcuts. Just the fundamentals that consistently help a local business get found.",
    readTime: "9 min",
    publishDate: "April 2026",
    body: [
      { type: "heading", text: "The fundamentals that matter" },
      {
        type: "list",
        items: [
          "A clear page title and description on every page",
          "Your business name, address and phone consistent everywhere online",
          "A Google Business Profile linked to your site",
          "Fast loading on mobile",
        ],
      },
      { type: "heading", text: "What to ignore" },
      {
        type: "paragraph",
        text: "Keyword stuffing and buying backlinks do more harm than good for a small local business — they are not shortcuts anymore.",
      },
      {
        type: "blockquote",
        text: "Being findable beats being flashy every time for a local business.",
      },
      { type: "heading", text: "A realistic timeline" },
      {
        type: "paragraph",
        text: "[Add your own timeline expectations based on results you have seen.]",
      },
    ],
  },
]

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug)
}
