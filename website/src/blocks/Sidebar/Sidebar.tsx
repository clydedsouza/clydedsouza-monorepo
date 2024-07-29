import Cta from "@/blocks/Cta/Cta";
import Avatar from "./Avatar/Avatar";
import Headline from "./Headline/Headline";
import "./Sidebar.scss";
import SocialIcons from "./SocialIcons/SocialIcons";

function Sidebar() {
  return (
    <div className="sidebar">
      <Avatar />
      <Headline />
      <SocialIcons />
      <Cta location="sidebar" />
    </div>
  );
}

export default Sidebar;
