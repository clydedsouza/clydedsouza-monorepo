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
      <Seo
        title={PageTypes.Platforms}
        image="https://files.clydedsouza.net/site/ogimage-platforms.png"
        description="Clyde D'Souza is software engineer and author based in Auckland, New Zealand. Feel free to send him a tweet @ClydeDz"
      />
      <Cards pageType={PageTypes.Platforms} sortCards={sortPlatformsByIdAsc} />
    </>
  )
}

export default Platforms
