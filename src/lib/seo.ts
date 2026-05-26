/** Central SEO config — portfolio + project pages */

import { getActiveSocialLinks } from "./socials";

export const SEO = {
  siteName: "Anish Jadhav",
  fullName: "Anish Abhijeet Jadhav",
  tagline: "AI Developer, Robotics Innovator, Web Developer",
  defaultDescription:
    "Portfolio of Anish Jadhav — AI developer, robotics innovator, and web developer. Explore NOVA AI Lab, computer vision experiments, client websites, and hardware prototypes.",
  twitterHandle: "@anish_jadhav",
  locale: "en_US",
  themeColor: "#0c0408",
  github: "https://github.com/anish1278",
  linkedin: "https://www.linkedin.com/in/anish-jadhav",
} as const;

export const DEFAULT_KEYWORDS = [
  "Anish Jadhav",
  "Anish Abhijeet Jadhav",
  "AI developer",
  "robotics innovator",
  "web developer",
  "portfolio",
  "NOVA AI",
  "computer vision",
  "MediaPipe",
  "OpenCV",
  "Arduino",
  "React developer",
  "student innovator",
  "JEE aspirant",
].join(", ");

export const SITE_ROUTES = [
  { path: "/", changefreq: "weekly" as const, priority: "1.0" },
  { path: "/ai-vision", changefreq: "monthly" as const, priority: "0.9" },
  { path: "/alfabyte", changefreq: "monthly" as const, priority: "0.9" },
  { path: "/car-safety", changefreq: "monthly" as const, priority: "0.9" },
];

export type PageSeoInput = {
  /** Page title without site suffix (suffix added automatically unless `fullTitle` is set) */
  title: string;
  description: string;
  /** Route path e.g. `/alfabyte` */
  path: string;
  keywords?: string[];
  ogType?: "website" | "article";
  ogImagePath?: string;
  noindex?: boolean;
  /** Use exact title string (no `| Anish Jadhav` suffix) */
  fullTitle?: boolean;
  /** Extra JSON-LD object(s) merged into @graph */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  if (fromEnv?.trim()) return fromEnv.trim().replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "https://anishjadhav.dev";
}

function canonicalUrl(path: string): string {
  const base = getSiteUrl();
  if (path === "/" || path === "") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function resolveTitle(title: string, fullTitle?: boolean): string {
  if (fullTitle) return title;
  if (title.includes(SEO.siteName)) return title;
  return `${title} | ${SEO.siteName}`;
}

export function buildPersonJsonLd(siteUrl: string) {
  return {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: SEO.fullName,
    alternateName: SEO.siteName,
    url: siteUrl,
    jobTitle: SEO.tagline,
    description: SEO.defaultDescription,
    sameAs: getActiveSocialLinks().map((link) => link.href),
    knowsAbout: [
      "Artificial Intelligence",
      "Robotics",
      "Web Development",
      "Computer Vision",
      "Embedded Systems",
    ],
  };
}

export function buildWebsiteJsonLd(siteUrl: string) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: `${SEO.siteName} — ${SEO.tagline}`,
    alternateName: SEO.fullName,
    url: siteUrl,
    description: SEO.defaultDescription,
    inLanguage: "en-US",
    publisher: { "@id": `${siteUrl}/#person` },
  };
}

export function buildWebPageJsonLd(
  siteUrl: string,
  path: string,
  title: string,
  description: string,
) {
  const url = canonicalUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
    inLanguage: "en-US",
  };
}

export function buildCreativeWorkJsonLd(
  siteUrl: string,
  path: string,
  name: string,
  description: string,
  genre: string,
) {
  const url = canonicalUrl(path);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name,
    description,
    url,
    genre,
    author: { "@id": `${siteUrl}/#person` },
    creator: { "@id": `${siteUrl}/#person` },
    inLanguage: "en-US",
  };
}

function buildJsonLdGraph(input: PageSeoInput, pageTitle: string) {
  const siteUrl = getSiteUrl();
  const graph: Record<string, unknown>[] = [
    buildPersonJsonLd(siteUrl),
    buildWebsiteJsonLd(siteUrl),
    buildWebPageJsonLd(siteUrl, input.path, pageTitle, input.description),
  ];

  if (input.jsonLd) {
    const extra = Array.isArray(input.jsonLd) ? input.jsonLd : [input.jsonLd];
    graph.push(...extra);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildPageHead(input: PageSeoInput) {
  const siteUrl = getSiteUrl();
  const title = resolveTitle(input.title, input.fullTitle);
  const canonical = canonicalUrl(input.path);
  const ogImage = `${siteUrl}${input.ogImagePath ?? "/og-image.svg"}`;
  const keywords = input.keywords?.join(", ") ?? DEFAULT_KEYWORDS;
  const robots = input.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return {
    meta: [
      { title },
      { name: "description", content: input.description },
      { name: "keywords", content: keywords },
      { name: "author", content: SEO.fullName },
      { name: "creator", content: SEO.fullName },
      { name: "publisher", content: SEO.fullName },
      { name: "robots", content: robots },
      { name: "googlebot", content: robots },
      { name: "theme-color", content: SEO.themeColor },
      { name: "application-name", content: SEO.siteName },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: SEO.siteName },
      { property: "og:title", content: title },
      { property: "og:description", content: input.description },
      { property: "og:type", content: input.ogType ?? "website" },
      { property: "og:url", content: canonical },
      { property: "og:locale", content: SEO.locale },
      { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: `${SEO.siteName} — ${SEO.tagline}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: SEO.twitterHandle },
      { name: "twitter:creator", content: SEO.twitterHandle },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: input.description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: `${SEO.siteName} — ${SEO.tagline}` },
    ],
    links: [
      { rel: "canonical", href: canonical },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildJsonLdGraph(input, title)),
      },
    ],
  };
}

/** Default favicon / PWA link tags for root layout */
export function buildRootHeadLinks() {
  return [
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.svg" },
    { rel: "manifest", href: "/site.webmanifest" },
  ];
}

export const PAGE_SEO = {
  home: {
    title: `${SEO.siteName} — ${SEO.tagline}`,
    fullTitle: true,
    description: SEO.defaultDescription,
    path: "/",
    keywords: [
      "Anish Jadhav portfolio",
      "AI robotics portfolio",
      "NOVA AI lab",
      "web developer India",
      "student developer portfolio",
    ],
  },
  aiVision: {
    title: "AI Vision Experiments",
    description:
      "Real-time computer vision projects by Anish Jadhav — AR finger drawing, Naruto hand-seal recognition, and gesture OS experiments built with MediaPipe, OpenCV, and WebRTC.",
    path: "/ai-vision",
    keywords: [
      "AI vision",
      "MediaPipe hands",
      "OpenCV",
      "AR drawing",
      "gesture recognition",
      "computer vision portfolio",
    ],
    jsonLd: (siteUrl: string) =>
      buildCreativeWorkJsonLd(
        siteUrl,
        "/ai-vision",
        "AI Vision Experiments",
        "Interactive AI and computer vision experiments with real-time hand tracking.",
        "Computer Vision",
      ),
  },
  alfabyte: {
    title: "Alfabyte Computers — Client Website",
    description:
      "Production retail website case study for Alfabyte Computers — React, Vite, Tailwind, Framer Motion, live deployment, and conversion-focused contact funnel by Anish Jadhav.",
    path: "/alfabyte",
    keywords: [
      "Alfabyte Computers",
      "client website",
      "React portfolio",
      "retail web design",
      "Vercel deployment",
    ],
    jsonLd: (siteUrl: string) =>
      buildCreativeWorkJsonLd(
        siteUrl,
        "/alfabyte",
        "Alfabyte Computers Website",
        "Production computer retail brand website with catalogue and contact funnel.",
        "Web Development",
      ),
  },
  carSafety: {
    title: "Smart Car Safety System — Robotics",
    description:
      "Arduino-based smart car safety prototype by Anish Jadhav — drowsiness detection, alcohol sensing, rear radar alerts, and award-winning science exhibition build.",
    path: "/car-safety",
    keywords: [
      "smart car safety",
      "Arduino project",
      "robotics prototype",
      "driver assistance",
      "science exhibition",
      "embedded systems",
    ],
    jsonLd: (siteUrl: string) =>
      buildCreativeWorkJsonLd(
        siteUrl,
        "/car-safety",
        "Smart Car Safety System",
        "Hardware driver-protection system with sensors, buzzer alerts, and automated response.",
        "Robotics",
      ),
  },
  notFound: {
    title: "Page Not Found",
    description: "The page you requested could not be found on Anish Jadhav's portfolio.",
    path: "/404",
    noindex: true,
  },
} as const;

export function pageHeadFromKey(
  key: keyof typeof PAGE_SEO,
): ReturnType<typeof buildPageHead> {
  const config = PAGE_SEO[key];
  const siteUrl = getSiteUrl();
  const jsonLd =
    "jsonLd" in config && typeof config.jsonLd === "function"
      ? config.jsonLd(siteUrl)
      : undefined;

  return buildPageHead({
    title: config.title,
    description: config.description,
    path: config.path,
    keywords: "keywords" in config ? [...config.keywords] : undefined,
    fullTitle: "fullTitle" in config ? config.fullTitle : undefined,
    noindex: "noindex" in config ? config.noindex : undefined,
    jsonLd,
  });
}

export function buildSitemapXml(): string {
  const siteUrl = getSiteUrl();
  const today = new Date().toISOString().slice(0, 10);

  const urls = SITE_ROUTES.map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path === "/" ? "/" : route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export function buildRobotsTxt(): string {
  const siteUrl = getSiteUrl();
  return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}
