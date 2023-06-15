import { useEffect, useState } from 'react'
import { getCachedProjectData } from '../../Api/Cache'
import { IProject } from '../../Api/IProjectData'
import Loader from '../Loader/Loader'
import { LoaderTypes } from '../Loader/LoaderTypes'
import { PageTypes } from '../Navigation/PageTypes'
import Card from './Card/Card'
import './Cards.scss'

export interface IProjectProps {
  pageType: PageTypes
  maxItemsToBeDisplayed?: number
  sortProject?: (projectA: IProject, projectB: IProject) => number
}

function Cards(props: IProjectProps) {
  const { pageType, maxItemsToBeDisplayed, sortProject } = props
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
                .slice(0, maxItemsToBeDisplayed)
                .map((item) => <Card {...item} key={item.id} />)
            ) : (
              <p>Couldn&lsquo;t load the data at this stage</p>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Cards
