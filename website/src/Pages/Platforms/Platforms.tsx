import { IProject } from '../../Api/IProjectData'
import Cards from '../../Components/Cards/Cards'
import { PageTypes } from '../../Components/Navigation/PageTypes'
import Seo from '../../Components/Seo/Seo'

function Platforms() {
  const sortPlatformsByIdAsc = (projectA: IProject, projectB: IProject) => {
    if (!projectA.date || !projectB.date) return 0
    return projectA.id.localeCompare(projectB.id)
  }

  return (
    <>
      <Seo title={PageTypes.Platforms} />
      <Cards
        pageType={PageTypes.Platforms}
        sortProject={sortPlatformsByIdAsc}
      />
    </>
  )
}

export default Platforms
