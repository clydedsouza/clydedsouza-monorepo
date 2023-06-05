import { useEffect, useState } from 'react'
import { getCachedProjectData } from '../../Api/Cache'
import { PageTypes } from '../../Types/PageTypes'
import { IProject } from '../../Types/ProjectData'
import ProjectTile from '../Projects/ProjectTile'

function Pinned() {
  const [projectData, setProjectData] = useState<IProject[]>([])

  useEffect(() => {
    getCachedProjectData(PageTypes.Pinned)
      .then((apiResponse) => {
        setProjectData(apiResponse.data)
      })
      .catch(() => {
        setProjectData([])
      })
  }, [])

  return (
    <>
      <h2>Highlights</h2>
      <div id="pinnedProjects">
        <div id="pinnedProjectsList">
          {projectData.length > 0 ? (
            projectData.map((item) => (
              <ProjectTile {...item} key={item.title} />
            ))
          ) : (
            <p>Couldn&lsquo;t load the data at this stage</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Pinned
