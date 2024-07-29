import AboutMe from "@/blocks/AboutMe/AboutMe";
import { PageViewAnalytics } from "@/blocks/Analytics/PageViewAnalytics";
import { PageTypes } from "@/blocks/Navigation/PageTypes";
import { generateMetadata } from "@/utility/seo";

export const metadata = generateMetadata({
  title: undefined,
  image: undefined,
  description: undefined,
});

export default function Home() {
  return (
    <>
      <PageViewAnalytics page={PageTypes.About} />
      <AboutMe />
    </>
  );
}
