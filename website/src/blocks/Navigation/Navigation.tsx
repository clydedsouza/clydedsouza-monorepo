"use client";

import { sendNavigationClickedEvent } from "@/api/Analytics";
import Link from "next/link";
import { useState } from "react";
import "./Navigation.scss";
import { PageTypes } from "./PageTypes";

function Navigation() {
  const [currentPage, setCurrentPage] = useState(PageTypes.About);

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
      </nav>
    </>
  );
}

export default Navigation;
