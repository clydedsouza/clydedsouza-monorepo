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
      <Seo
        title={PageTypes.Portfolio}
        image="https://files.clydedsouza.net/site/ogimage-portfolio.png"
        description="Have a look at some of the most interesting projects created by Clyde D'Souza, a software engineer and author based in Auckland, New Zealand."
      />
      <Cards
        pageType={PageTypes.Portfolio}
        sortCards={sortPortfolioByDateDesc}
      />
    </>
  )
}

export default Portfolio
