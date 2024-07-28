import type { Metadata } from "next";

export interface ISeo {
  title?: string;
  description?: string;
  image?: string;
}

export const WEBSITE_BASE_URL = "https://clydedsouza.net/";

export const generateMetadata = (props: ISeo): Metadata => {
  const titlePrefix = props.title ? `${props.title} — ` : "";
  const title = `${titlePrefix}Clyde D'Souza — Software Engineer and Author`;

  const defaultDescription =
    "Clyde D'Souza is software engineer and author based in Auckland, New Zealand. Feel free to send him a tweet @ClydeDz";
  const description = props.description ?? defaultDescription;

  const defaultOgImage = "https://files.clydedsouza.net/site/ogimage.png";
  const image = props.image ?? defaultOgImage;

  const metadata: Metadata = {
    title,
    description,
    applicationName: "clydedsouza.net",
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      images: [{ url: image }],
    },
    twitter: {
      title,
      description,
      creator: "@clydedz",
      images: [{ url: image }],
    },
    authors: {
      name: "Clyde D'Souza",
      url: WEBSITE_BASE_URL,
    },
    keywords:
      "Clyde D'Souza, @ClydeDz, full-stack software engineer, senior software engineer, passionate front end developer, passionate back end developer, full stack developer, author, childrens bedtime stories, eye for ui, ux, Mumbai, India, IND, Auckland, New Zealand, NZ",
    themeColor: "#009688",
    manifest: `${WEBSITE_BASE_URL}manifest.json`,
    icons: [
      {
        rel: "icon",
        url: `${WEBSITE_BASE_URL}favicon.ico`,
      },
      {
        rel: "icon",
        url: "https://files.clydedsouza.net/device-icons/apple-touch-icon-180x180.png",
        sizes: "192x192",
      },
      {
        rel: "apple-touch-icon",
        url: "https://files.clydedsouza.net/device-icons/apple-touch-icon-57x57.png",
        sizes: "57x57",
      },
      {
        rel: "apple-touch-icon",
        url: "https://files.clydedsouza.net/device-icons/apple-touch-icon-114x114.png",
        sizes: "114x114",
      },
      {
        rel: "apple-touch-icon",
        url: "https://files.clydedsouza.net/device-icons/apple-touch-icon-72x72.png",
        sizes: "72x72",
      },
      {
        rel: "apple-touch-icon",
        url: "https://files.clydedsouza.net/device-icons/apple-touch-icon-60x60.png",
        sizes: "60x60",
      },
      {
        rel: "apple-touch-icon",
        url: "https://files.clydedsouza.net/device-icons/apple-touch-icon-120x120.png",
        sizes: "120x120",
      },
      {
        rel: "apple-touch-icon",
        url: "https://files.clydedsouza.net/device-icons/apple-touch-icon-76x76.png",
        sizes: "76x76",
      },
      {
        rel: "apple-touch-icon",
        url: "https://files.clydedsouza.net/device-icons/apple-touch-icon-152x152.png",
        sizes: "152x152",
      },
      {
        rel: "apple-touch-icon",
        url: "https://files.clydedsouza.net/device-icons/apple-touch-icon-180x180.png",
        sizes: "180x180",
      },
    ],
  };
  return metadata;
};
