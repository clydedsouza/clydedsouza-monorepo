import { IProject } from '../../Api/IProjectData'
import Cards from '../../Components/Cards/Cards'
import { PageTypes } from '../../Components/Navigation/PageTypes'
import Seo from '../../Components/Seo/Seo'

function Portfolio() {
  const sortPortfolioByDateDesc = (projectA: IProject, projectB: IProject) => {
    if (!projectA.date || !projectB.date) return 0
    return Number(new Date(projectB.date)) - Number(new Date(projectA.date))
  }

  return (
    <>
      <Seo title={PageTypes.Portfolio} />
      <Cards
        pageType={PageTypes.Portfolio}
        sortCards={sortPortfolioByDateDesc}
      />
    </>
  )
}

export default Portfolio
