export const DEMO_SESSION_COOKIE = "ekraf_demo_session";
export const DEMO_EMAIL_COOKIE = "ekraf_demo_email";

export const DEFAULT_DEMO_EMAIL = "demo@ekraf.local";
export const DEFAULT_DEMO_PASSWORD = "demo123456";

export const DEMO_CATEGORIES = [
  {
    id: "demo-cat-1",
    name: "Digital Services",
    slug: "digital-services",
  },
  {
    id: "demo-cat-2",
    name: "Apparel & Merchandise",
    slug: "apparel-merchandise",
  },
  {
    id: "demo-cat-3",
    name: "F&B / Dana Usaha",
    slug: "fnb-danus",
  },
  {
    id: "demo-cat-4",
    name: "Printing Services",
    slug: "printing-services",
  },
] as const;

export function isDemoModeEnabled() {
  return process.env.DEMO_MODE === "true";
}

export function getDemoCredentials() {
  return {
    email: process.env.DEMO_EMAIL ?? DEFAULT_DEMO_EMAIL,
    password: process.env.DEMO_PASSWORD ?? DEFAULT_DEMO_PASSWORD,
  };
}
