import { useEffect, useState } from 'react'
import { getCachedProjectData } from '../../Api/Cache'
import Seo from '../../Components/Seo/Seo'
import { PageTypes } from '../../Types/PageTypes'
import { IProject } from '../../Types/ProjectData'
import ProjectTile from './ProjectTile'

export interface IProjectProps {
  name: PageTypes
}

function Projects(props: IProjectProps) {
  const [projectData, setProjectData] = useState<IProject[]>([])

  useEffect(() => {
    getCachedProjectData(props.name)
      .then((apiResponse) => {
        console.log('state', projectData)
        console.log('api', apiResponse.data)
        setProjectData(apiResponse.data)
      })
      .catch(() => {
        setProjectData([])
      })
  }, [props.name])

  return (
    <>
      <Seo title={props.name} />
      <div id="pinnedProjects">
        <div id="pinnedProjectsList">
          {projectData.length > 0 ? (
            projectData
              .sort((dateA, dateB) => {
                return (
                  Number(new Date(dateB.date)) - Number(new Date(dateA.date))
                )
              })
              .map((item) => <ProjectTile {...item} key={item.id} />)
          ) : (
            <p>Couldn&lsquo;t load the data at this stage</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Projects