import { PageViewAnalytics } from "@/blocks/Analytics/PageViewAnalytics";
import Cards from "@/blocks/Cards/Cards";
import { PageTypes } from "@/blocks/Navigation/PageTypes";
import { generateMetadata } from "@/utility/seo";

export const metadata = generateMetadata({
  title: PageTypes.Platforms,
  image: "https://files.clydedsouza.net/site/ogimage-platforms.png",
  description:
    "Clyde D'Souza is software engineer and author based in Auckland, New Zealand. Feel free to send him a tweet @ClydeDz",
});

export default function Platforms() {
  return (
    <>
      <PageViewAnalytics page={PageTypes.Platforms} />
      <Cards pageType={PageTypes.Platforms} />
    </>
  );
}
