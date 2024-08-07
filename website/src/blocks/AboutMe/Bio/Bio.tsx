"use client";
import { sendLinkClickedEvent } from "@/api/Analytics";
import { AnalyticsLinkType } from "@/api/IAnalytics";

function Bio() {
  return (
    <>
      <h2>About me</h2>
      <p>
        Hi! I&apos;m Clyde D&apos;Souza. I&apos;m a creative and self-driven
        person who likes to code and do other things. I&apos;m currently working
        as a senior software engineer at{" "}
        <a
          href="https://www.xero.com/nz/?ref=clydedsouza.net"
          rel="noreferrer"
          target="_blank"
          onClick={() =>
            sendLinkClickedEvent({
              link: "https://www.xero.com/nz/",
              type: AnalyticsLinkType.GeneralWebsite,
            })
          }
        >
          Xero
        </a>
        . Previously, I&apos;ve worked with{" "}
        <a
          href="https://www.datacom.co.nz/?ref=clydedsouza.net"
          rel="noreferrer"
          target="_blank"
          onClick={() =>
            sendLinkClickedEvent({
              link: "https://www.datacom.co.nz/",
              type: AnalyticsLinkType.GeneralWebsite,
            })
          }
        >
          Datacom
        </a>{" "}
        and{" "}
        <a
          href="https://www.heritagehotels.co.nz/?ref=clydedsouza.net"
          rel="noreferrer"
          target="_blank"
          onClick={() =>
            sendLinkClickedEvent({
              link: "https://www.heritagehotels.co.nz/",
              type: AnalyticsLinkType.GeneralWebsite,
            })
          }
        >
          Heritage Hotels
        </a>
        .
      </p>
      <p>
        I was the event director of a non-profit educational event called Light
        & Spark NPO. I conceptualized and executed this event in Mumbai along
        with my{" "}
        <a
          href="https://lightandsparknpo.github.io/team/"
          rel="noreferrer"
          target="_blank"
          onClick={() =>
            sendLinkClickedEvent({
              link: "https://lightandsparknpo.github.io/team/",
              type: AnalyticsLinkType.GeneralWebsite,
            })
          }
        >
          amazing team
        </a>
        . Read more about it{" "}
        <a
          href="https://lightandsparknpo.github.io/2019-11-20-ruia-mumbai-2018/"
          rel="noreferrer"
          target="_blank"
          onClick={() =>
            sendLinkClickedEvent({
              link: "https://lightandsparknpo.github.io/2019-11-20-ruia-mumbai-2018/",
              type: AnalyticsLinkType.GeneralWebsite,
            })
          }
        >
          here
        </a>
        .
      </p>
      <p>
        I&apos;ve published a book titled Mama, Tell Me a Story which is
        available on{" "}
        <a
          href="http://mamatellmeastory.clydedsouza.net/"
          rel="noreferrer"
          target="_blank"
          onClick={() =>
            sendLinkClickedEvent({
              link: "http://mamatellmeastory.clydedsouza.net/",
              type: AnalyticsLinkType.GeneralWebsite,
            })
          }
        >
          these platforms
        </a>
        . It&apos;s a collection of twelve short bedtime stories that parents
        will love reading to their kids over and over again. Go buy it now!
      </p>
      <p>
        In my spare time, I like to explore other interests like{" "}
        <a
          href="https://medium.com/@clydedz"
          rel="noreferrer"
          target="_blank"
          onClick={() =>
            sendLinkClickedEvent({
              link: "https://medium.com/@clydedz",
              type: AnalyticsLinkType.GeneralWebsite,
            })
          }
        >
          writing
        </a>
        ,{" "}
        <a
          href="https://www.behance.net/clydedz"
          rel="noreferrer"
          target="_blank"
          onClick={() =>
            sendLinkClickedEvent({
              link: "https://www.behance.net/clydedz",
              type: AnalyticsLinkType.GeneralWebsite,
            })
          }
        >
          designing
        </a>
        ,{" "}
        <a
          href="https://www.skillshare.com/r/user/clydedsouza"
          rel="noreferrer"
          target="_blank"
          onClick={() =>
            sendLinkClickedEvent({
              link: "https://www.skillshare.com/r/user/clydedsouza",
              type: AnalyticsLinkType.GeneralWebsite,
            })
          }
        >
          teaching
        </a>
        , and I&apos;ve also created many other projects.
      </p>
      <p>
        I&apos;m an alumnus of{" "}
        <a
          href="https://www.aut.ac.nz/?ref=clydedsouza"
          rel="noreferrer"
          target="_blank"
          onClick={() =>
            sendLinkClickedEvent({
              link: "https://www.aut.ac.nz/",
              type: AnalyticsLinkType.GeneralWebsite,
            })
          }
        >
          Auckland University of Technology (AUT)
        </a>{" "}
        with a Postgraduate Diploma in Computer and Information Sciences and
        holds a Bachelor of Science degree specializing in Information
        Technology from University of Mumbai, India.
      </p>
    </>
  );
}

export default Bio;
