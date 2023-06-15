import { IProject } from '../../../Api/IProjectData'
import Cards from '../../../Components/Cards/Cards'
import { PageTypes } from '../../../Components/Navigation/PageTypes'

const MAX_HIGHLIGHT_ITEMS = 3

function Highlights() {
  const sortHighlightsByDateDesc = (projectA: IProject, projectB: IProject) => {
    if (!projectA.date || !projectB.date) return 0
    return Number(new Date(projectB.date)) - Number(new Date(projectA.date))
  }

  return (
    <>
      <h2>Highlights</h2>
      <Cards
        pageType={PageTypes.Highlights}
        maxItemsToBeDisplayed={MAX_HIGHLIGHT_ITEMS}
        sortProject={sortHighlightsByDateDesc}
      />
    </>
  )
}

export default Highlights
