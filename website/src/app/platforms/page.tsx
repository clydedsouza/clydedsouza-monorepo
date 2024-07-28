import Cards from "@/blocks/Cards/Cards";
import { PageTypes } from "@/blocks/Navigation/PageTypes";

export default function Platforms() {
  return (
    <>
      <Cards pageType={PageTypes.Platforms} />
      {/* sortCards={sortPlatformsByIdAsc}  */}
    </>
  );
}
