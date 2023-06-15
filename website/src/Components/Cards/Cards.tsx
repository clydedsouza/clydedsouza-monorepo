import { useEffect, useState } from 'react'
import { getCachedProjectData } from '../../Api/Cache'
import { IProject } from '../../Api/IProjectData'
import Loader from '../Loader/Loader'
import { LoaderTypes } from '../Loader/LoaderTypes'
import { PageTypes } from '../Navigation/PageTypes'
import Card from './Card/Card'
import './Cards.scss'

export interface ICardsProps {
  pageType: PageTypes
  maxCardsToBeDisplayed?: number
  sortCards?: (projectA: IProject, projectB: IProject) => number
}

function Cards(props: ICardsProps) {
  const { pageType, maxCardsToBeDisplayed, sortCards } = props
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
          <div className="cards">
            {projectData.length > 0 ? (
              projectData
                .sort(sortCards)
                .slice(0, maxCardsToBeDisplayed)
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
