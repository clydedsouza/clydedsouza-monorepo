"use client";

import { sendNavigationClickedEvent } from "@/api/Analytics";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./Navigation.scss";
import { PageTypes } from "./PageTypes";

const getCurrentPage = (pathFromNextJs: string) => {
  const cleanPath = pathFromNextJs.replaceAll("/", "").toLowerCase();

  if (cleanPath === PageTypes.Platforms.toLowerCase()) {
    return PageTypes.Platforms;
  } else if (cleanPath === PageTypes.Portfolio.toLowerCase()) {
    return PageTypes.Portfolio;
  } else {
    return PageTypes.About;
  }
};

function Navigation() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage(usePathname()));

  const onNavigationItemClick = (pageType: PageTypes) => {
    sendNavigationClickedEvent(pageType);
    setCurrentPage(pageType);
  };

  return (
    <>
      <nav>
        <Link
          href="/"
          className={currentPage === PageTypes.About ? "active" : ""}
          onClick={() => onNavigationItemClick(PageTypes.About)}
        >
          {PageTypes.About}
        </Link>
        <Link
          href={PageTypes.Portfolio.toLowerCase()}
          className={currentPage === PageTypes.Portfolio ? "active" : ""}
          onClick={() => onNavigationItemClick(PageTypes.Portfolio)}
        >
          {PageTypes.Portfolio}
        </Link>
        <Link
          href={PageTypes.Platforms.toLowerCase()}
          className={currentPage === PageTypes.Platforms ? "active" : ""}
          onClick={() => onNavigationItemClick(PageTypes.Platforms)}
        >
          {PageTypes.Platforms}
        </Link>
        <Link
          href={"https://blog.clydedsouza.net"}
          target="_blank"
          onClick={() => sendNavigationClickedEvent(PageTypes.Blog)}
        >
          {PageTypes.Blog}
        </Link>
      </nav>
    </>
  );
}

export default Navigation;
