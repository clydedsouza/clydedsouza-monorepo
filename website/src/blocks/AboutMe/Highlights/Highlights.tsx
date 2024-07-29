import Cards from "@/blocks/Cards/Cards";
import { PageTypes } from "@/blocks/Navigation/PageTypes";

const MAX_HIGHLIGHT_ITEMS = 3;

function Highlights() {
  return (
    <>
      <h2>Highlights</h2>
      <Cards
        pageType={PageTypes.Highlights}
        maxCardsToBeDisplayed={MAX_HIGHLIGHT_ITEMS}
      />
    </>
  );
}

export default Highlights;
