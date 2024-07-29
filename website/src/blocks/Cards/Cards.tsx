"use client";

import { getCachedProjectData } from "@/api/Cache";
import { IProject } from "@/api/IProjectData";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { LoaderTypes } from "../Loader/LoaderTypes";
import { PageTypes } from "../Navigation/PageTypes";
import Card from "./Card/Card";
import "./Cards.scss";

export interface ICardsProps {
  pageType: PageTypes;
  maxCardsToBeDisplayed?: number; 
}

function Cards(props: ICardsProps) {
  const { pageType, maxCardsToBeDisplayed, } = props;
  const [projectData, setProjectData] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sortHighlightsByDateDesc = (projectA: IProject, projectB: IProject) => {
    if (!projectA.date || !projectB.date) return 0;
    return Number(new Date(projectB.date)) - Number(new Date(projectA.date));
  };

  useEffect(() => {
    setIsLoading(true);
    getCachedProjectData(pageType)
      .then((apiResponse) => {
        setProjectData(apiResponse.data);
      })
      .catch(() => {
        setProjectData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pageType]);

  return (
    <>
      {isLoading ? (
        <Loader variant={LoaderTypes.Primary} />
      ) : (
        <>
          <div className="cards">
            {projectData.length > 0 ? (
              projectData
                .sort(sortHighlightsByDateDesc)
                .slice(0, maxCardsToBeDisplayed)
                .map((item) => <Card {...item} key={item.id} />)
            ) : (
              <p>Couldn&lsquo;t load the data at this stage</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Cards;
