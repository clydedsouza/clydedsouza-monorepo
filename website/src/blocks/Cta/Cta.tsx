"use client";

import { sendLinkClickedEvent } from "@/api/Analytics";
import { getCachedProjectData } from "@/api/Cache";
import { AnalyticsLinkType } from "@/api/IAnalytics";
import { IProject } from "@/api/IProjectData";
import Loader from "@/blocks/Loader/Loader";
import { LoaderTypes } from "@/blocks/Loader/LoaderTypes";
import { useEffect, useState } from "react";
import { PageTypes } from "../Navigation/PageTypes";
import "./Cta.scss";

interface ICtaProps {
  location?: string;
}

function Cta({ location }: ICtaProps) {
  const [projectData, setProjectData] = useState<Partial<IProject>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getCachedProjectData(PageTypes.Cta)
      .then((apiResponse) => {
        setProjectData(apiResponse.data);
      })
      .catch(() => {
        setProjectData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const CtaLink = (items: Partial<IProject>[]) => {
    if (items.length < 1) return;
    const randomizedProject =
      items[Math.floor(Math.random() * (items.length - 1 - 0 + 1) + 0)];

    if (!randomizedProject.title || !randomizedProject.website) return;
    return (
      <div className="cta" data-location={location}>
        <a
          href={randomizedProject.website}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            sendLinkClickedEvent({
              link: randomizedProject.website,
              type: AnalyticsLinkType.Cta,
              location: location,
            })
          }
        >
          {randomizedProject.title}
        </a>
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader variant={LoaderTypes.Inverse} />
      ) : projectData.length > 0 ? (
        CtaLink(projectData)
      ) : (
        <p>Couldn&lsquo;t load the data at this stage</p>
      )}
    </>
  );
}

export default Cta;
