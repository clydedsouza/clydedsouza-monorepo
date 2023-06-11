import { useEffect, useState } from 'react'
import { getCachedProjectData } from '../../Api/Cache'
import { IProject } from '../../Api/IProjectData'
import Loader from '../../Components/Loader/Loader'
import { LoaderTypes } from '../../Components/Loader/LoaderTypes'
import { PageTypes } from '../../Components/Navigation/PageTypes'
import ProjectTile from '../../Components/ProjectTile/ProjectTile'
import Seo from '../../Components/Seo/Seo'
import './Projects.scss'

export interface IProjectProps {
  name: PageTypes
}

function Projects(props: IProjectProps) {
  const [projectData, setProjectData] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    getCachedProjectData(props.name)
      .then((apiResponse) => {
        setProjectData(apiResponse.data)
      })
      .catch(() => {
        setProjectData([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [props.name])

  return (
    <>
      <Seo title={props.name} />
      {isLoading ? (
        <Loader variant={LoaderTypes.Primary} />
      ) : (
        <>
          <div className="projects">
            {projectData.length > 0 ? (
              projectData
                .sort((dateA, dateB) => {
                  if (!dateA.date || !dateB.date) return 0
                  return (
                    Number(new Date(dateB.date)) - Number(new Date(dateA.date))
                  )
                })
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
