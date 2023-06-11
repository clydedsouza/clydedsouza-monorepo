import { useEffect, useState } from 'react'
import { getCachedProjectData } from '../../../Api/Cache'
import Loader from '../../../Components/Loader/Loader'
import { LoaderTypes } from '../../../Components/Loader/LoaderTypes'
import ProjectTile from '../../../Components/ProjectTile/ProjectTile'
import { PageTypes } from '../../../Types/PageTypes'
import { IProject } from '../../../Types/ProjectData'

const MAX_PINNED_ITEMS = 3

function Pinned() {
  const [projectData, setProjectData] = useState<IProject[]>([])
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
        <Loader variant={LoaderTypes.Primary} />
      ) : (
        <div className="pinned-projects">
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
      )}
    </>
  )
}

export default Pinned
