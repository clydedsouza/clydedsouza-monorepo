import { useEffect, useState } from 'react'
import { getCachedProjectData } from '../../Api/Cache'
import { IProject } from '../../Api/IProjectData'
import Loader from '../../Components/Loader/Loader'
import { LoaderTypes } from '../../Components/Loader/LoaderTypes'
import { PageTypes } from '../../Components/Navigation/PageTypes'
import ProjectTile from '../../Components/ProjectTile/ProjectTile'
import './Projects.scss'

export interface IProjectProps {
  pageType: PageTypes
  sortProject?: (projectA: IProject, projectB: IProject) => number
}

function Projects(props: IProjectProps) {
  const { pageType, sortProject } = props
  const [projectData, setProjectData] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    getCachedProjectData(pageType)
      .then((apiResponse) => {
        setProjectData(apiResponse.data)
      })
      .catch(() => {
        setProjectData([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [pageType])

  return (
    <>
      {isLoading ? (
        <Loader variant={LoaderTypes.Primary} />
      ) : (
        <>
          <div className="projects">
            {projectData.length > 0 ? (
              projectData
                .sort(sortProject)
                .map((item) => <ProjectTile {...item} key={item.id} />)
            ) : (
              <p>Couldn&lsquo;t load the data at this stage</p>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Projects
