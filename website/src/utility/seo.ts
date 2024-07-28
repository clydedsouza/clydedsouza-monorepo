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
  };
  return metadata;
};
