import { useEffect, useState } from 'react'
import { getCachedProjectData } from '../../Api/Cache'
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
        setProjectData(apiResponse.data)
      })
      .catch(() => {
        setProjectData([])
      })
  }, [props.name])

  return (
    <div id="pinnedProjects">
      <div id="pinnedProjectsList">
        {projectData.length > 0 ? (
          projectData.map((item) => <ProjectTile {...item} key={item.title} />)
        ) : (
          <p>Couldn&lsquo;t load the data at this stage</p>
        )}
      </div>
    </div>
  )
}

export default Projects
