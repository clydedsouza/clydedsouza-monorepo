import { IProject } from '../../Api/IProjectData'
import { PageTypes } from '../../Components/Navigation/PageTypes'
import Seo from '../../Components/Seo/Seo'
import Projects from '../Projects/Projects'

function Portfolio() {
  const sortProjectsByDateDesc = (projectA: IProject, projectB: IProject) => {
    if (!projectA.date || !projectB.date) return 0
    return Number(new Date(projectB.date)) - Number(new Date(projectA.date))
  }

  return (
    <>
      <Seo title={PageTypes.Portfolio} />
      <Projects
        pageType={PageTypes.Portfolio}
        sortProject={sortProjectsByDateDesc}
      />
    </>
  )
}

export default Portfolio
