"use client";

import { sendPageViewEvent } from "@/api/Analytics";
import { useEffect } from "react";
import { PageTypes } from "../Navigation/PageTypes";

export const PageViewAnalytics: React.FC<{ page: PageTypes }> = ({ page }) => {
  useEffect(() => {
    sendPageViewEvent(page);
  }, []);
  return <></>;
};
