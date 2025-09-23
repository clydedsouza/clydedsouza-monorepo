import Cta from "@/blocks/Cta/Cta";
import { AdUnit } from "next-google-adsense";
import "./Footer.scss";

function Footer() {
  const isProduction = process.env.NODE_ENV === "production";
  const optionalAttributes = isProduction ? {} : { className: "advt-border" };

  return (
    <>
      <footer>
        <Cta location="footer" />
        <p>Website crafted by Clyde DSouza</p>
        <div className="google-advt">
          <div {...optionalAttributes}>
            <AdUnit
              publisherId="pub-4666761687967451"
              slotId="9934890562"
              layout="display"
            />
          </div>
          <div className="subtle-text">Google ad</div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
