/** Footer link columns. Links without `href` are pages that don't exist yet: they show as "Soon", not as dead links. */
export interface FooterLink {
  label: string;
  href?: string;
}

export const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Live Classes", href: "/features#live" },
      { label: "Courses", href: "/features#courses" },
      { label: "Quizzes & Exams", href: "/features#assessments" },
      { label: "Analytics", href: "/features#analytics" },
    ],
  },
  {
    title: "Company",
    links: [{ label: "About Us" }, { label: "Contact", href: "/contact" }, { label: "Book a Demo", href: "/contact?topic=DEMO" }, { label: "Careers" }],
  },
  {
    title: "Resources",
    links: [{ label: "Help Center", href: "/contact?topic=SUPPORT" }, { label: "Documentation" }, { label: "FAQ", href: "/#faq" }, { label: "Blog" }],
  },
  {
    title: "Legal",
    links: [{ label: "Privacy Policy" }, { label: "Terms of Service" }, { label: "Refund Policy" }],
  },
];

export type SocialNetwork = "facebook" | "youtube" | "linkedin" | "x";

/** EduPro's social pages. Empty `href` = not set up yet (icon hidden). Fill these in when the pages exist. */
export const SOCIAL_LINKS: { network: SocialNetwork; label: string; href: string }[] = [
  { network: "facebook", label: "Facebook", href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "" },
  { network: "youtube", label: "YouTube", href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "" },
  { network: "linkedin", label: "LinkedIn", href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "" },
  { network: "x", label: "X", href: process.env.NEXT_PUBLIC_SOCIAL_X || "" },
];
