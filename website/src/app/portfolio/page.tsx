import Cards from "@/blocks/Cards/Cards";
import { PageTypes } from "@/blocks/Navigation/PageTypes";

export default function Portfolio() {
  return (
    <>
      <Cards pageType={PageTypes.Portfolio} />
    </>
  );
}
