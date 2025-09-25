import { AdUnit } from "next-google-adsense";
import "./GoogleAds.scss";
import { usePathname } from "next/navigation";

export const GoogleAds = () => {
  const path = usePathname();
  const isProduction = process.env.NODE_ENV === "production";
  const optionalAttributes = isProduction
    ? {}
    : { className: "google-ads-container-dev" };
  return (
    <div className="google-ads" key={path.toString()}>
      <div {...optionalAttributes}>
        <AdUnit slotId="7735157113" layout="in-article" />
      </div>
      <div className="text-faint">Google ad</div>
    </div>
  );
};
