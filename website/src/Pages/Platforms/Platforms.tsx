import { IProject } from '../../Api/IProjectData'
import { PageTypes } from '../../Components/Navigation/PageTypes'
import Seo from '../../Components/Seo/Seo'
import Projects from '../Projects/Projects'

function Platforms() {
  const sortPlatformsByIdAsc = (projectA: IProject, projectB: IProject) => {
    if (!projectA.date || !projectB.date) return 0
    return projectA.id.localeCompare(projectB.id)
  }

  return (
    <>
      <Seo title={PageTypes.Platforms} />
      <Projects
        pageType={PageTypes.Platforms}
        sortProject={sortPlatformsByIdAsc}
      />
    </>
  )
}

export default Platforms
