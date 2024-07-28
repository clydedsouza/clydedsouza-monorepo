import AboutMe from "@/blocks/AboutMe/AboutMe";
import { generateMetadata } from "@/utility/seo";

export const metadata = generateMetadata({
  title: undefined,
  image: undefined,
  description: undefined,
});

export default function Home() {
  return <AboutMe />;
}
