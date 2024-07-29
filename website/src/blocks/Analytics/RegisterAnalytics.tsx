"use client";

import { initAnalyticsWithSuperProperties } from "@/api/Analytics";
import { useEffect } from "react";

export const RegisterAnalytics = () => {
  useEffect(() => {
    initAnalyticsWithSuperProperties();
  }, []);
  return <></>;
};
