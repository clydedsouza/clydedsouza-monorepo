// import { useEffect } from "react";
// import { sendPageViewEvent } from '../../Api/Analytics'
import Bio from "./Bio/Bio";
import Highlights from './Highlights/Highlights'

function AboutMe() {
  // useEffect(() => {
  //   sendPageViewEvent(PageTypes.About);
  // }, []);

  return (
    <>
      <Bio />
      <br></br>
      <Highlights />
    </>
  );
}

export default AboutMe;
