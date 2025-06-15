import { PageViewAnalytics } from "@/blocks/Analytics/PageViewAnalytics";
import Cards from "@/blocks/Cards/Cards";
import { PageTypes } from "@/blocks/Navigation/PageTypes";
import { generateMetadata } from "@/utility/seo";

export const metadata = generateMetadata({
  title: PageTypes.Portfolio,
  image: "https://files.clydedsouza.net/site/ogimage-portfolio.png",
  description:
    "Have a look at some of the most interesting projects created by Clyde D'Souza, a software engineer and digital content creator based in Auckland, New Zealand.",
});

export default function Portfolio() {
  return (
    <>
      <PageViewAnalytics page={PageTypes.Portfolio} />
      <Cards pageType={PageTypes.Portfolio} />
    </>
  );
}
