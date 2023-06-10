import { useEffect, useState } from 'react'
import { getCachedProjectData } from '../../../Api/Cache'
import ProjectTile from '../../../Components/ProjectTile/ProjectTile'
import { PageTypes } from '../../../Types/PageTypes'
import { IProject } from '../../../Types/ProjectData'

const MAX_PINNED_ITEMS = 4

function Pinned() {
  const [projectData, setProjectData] = useState<Partial<IProject>[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    getCachedProjectData(PageTypes.Pinned)
      .then((apiResponse) => {
        setProjectData(apiResponse.data)
      })
      .catch(() => {
        setProjectData([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <h2>Highlights</h2>
      {isLoading ? (
        <p>Contents are loading...</p>
      ) : (
        <div id="pinnedProjects">
          <div id="pinnedProjectsList">
            {projectData.length > 0 ? (
              projectData
                .sort((dateA, dateB) => {
                  if (!dateA.date || !dateB.date) return 0
                  return (
                    Number(new Date(dateB.date)) - Number(new Date(dateA.date))
                  )
                })
                .slice(0, MAX_PINNED_ITEMS)
                .map((item) => <ProjectTile {...item} key={item.title} />)
            ) : (
              <p>Couldn&lsquo;t load the data at this stage</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Pinned
