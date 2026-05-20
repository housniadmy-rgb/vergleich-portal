export const siteConfig = {
  name: "Elektronik-Vergleich",
  shortName: "E-Vergleich",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.elektronik-vergleich.de").replace(
    /\/$/,
    "",
  ),
  description:
    "Das unabhängige Vergleichsportal für Elektronik: Smartphones, Laptops, Tablets, Kopfhörer, Smartwatches, Monitore & Gaming objektiv vergleichen.",
  locale: "de_DE",
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  amazonTag: process.env.NEXT_PUBLIC_AMAZON_TAG || "elektronikverg-21",
};

export type SiteConfig = typeof siteConfig;
