import Cta from "@/blocks/Cta/Cta";
import "./Footer.scss";
import { GoogleAds } from "../GoogleAds/GoogleAds";

function Footer() {
  return (
    <>
      <footer>
        <GoogleAds />
        <p>Website crafted by Clyde D'Souza</p>
      </footer>
    </>
  );
}

export default Footer;
