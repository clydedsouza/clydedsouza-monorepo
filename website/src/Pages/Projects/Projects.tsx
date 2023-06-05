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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showInactive, toggleShowInactive] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    getCachedProjectData(props.name)
      .then((apiResponse) => {
        setProjectData(apiResponse.data)
        setIsLoading(false)
      })
      .catch(() => {
        setProjectData([])
      })
  }, [props.name])

  return (
    <>
      <Seo title={props.name} />
      {isLoading ? (
        <p>Contents are loading...</p>
      ) : (
        <>
          <form className="form-inline">
            <div className="noinactive hidden" />
            <input
              type="search"
              id="searchTxt"
              className="form-control"
              placeholder="Search..."
            />
            <div id="includeInactiveContainer">
              <label className="switch-label" htmlFor="includeInactive">
                Show inactive
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="includeInactive"
                  onClick={() => toggleShowInactive(!showInactive)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </form>
          <div id="pinnedProjects">
            <div id="pinnedProjectsList">
              {projectData.length > 0 ? (
                projectData
                  .sort((dateA, dateB) => {
                    return (
                      Number(new Date(dateB.date)) -
                      Number(new Date(dateA.date))
                    )
                  })
                  .map((item) => <ProjectTile {...item} key={item.id} />)
              ) : (
                <p>Couldn&lsquo;t load the data at this stage</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Projects
