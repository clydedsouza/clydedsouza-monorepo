"use client";

import { AdUnit } from "next-google-adsense";
import { usePathname } from "next/navigation";
import "./GoogleAds.scss";

export const GoogleAds = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const optionalAttributes = isProduction
    ? {}
    : { className: "google-ads-container-dev" };

  const path = usePathname();
  const keyAttributes = isProduction ? { key: path.toString() } : {};

  return (
    <div className="google-ads" {...keyAttributes}>
      <div {...optionalAttributes}>
        <AdUnit slotId="7735157113" layout="in-article" />
      </div>
      <div className="text-faint">Google ad</div>
    </div>
  );
};
