/** Edit these URLs — leave empty string until your profile is ready */

export type SocialPlatform = "github" | "linkedin" | "instagram";

export type SocialLink = {
  id: SocialPlatform;
  label: string;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/anish1278",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anish-jadhav-a960a6402/",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/anishjadhav_?igsh=MW1laWR6bHJtdW52dQ%3D%3D",
  },
];

export function getActiveSocialLinks(): SocialLink[] {
  return SOCIAL_LINKS.filter((link) => link.href.trim().length > 0);
}
