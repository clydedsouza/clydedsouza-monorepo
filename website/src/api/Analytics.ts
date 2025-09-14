import mixpanel from "mixpanel-browser";
import { PageTypes } from "../blocks/Navigation/PageTypes";
import { ILinkClickedProps, MIXPANEL_DEV_PROJECT_ID } from "./IAnalytics";

export const initAnalyticsWithSuperProperties = () => {
  const mixpanelProjectId =
    process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? MIXPANEL_DEV_PROJECT_ID;
  try {
    mixpanel.init(mixpanelProjectId, {
      debug: false,
      track_pageview: true,
      ignore_dnt: true,
      persistence: "localStorage",
    });
  } catch {
    undefined;
  }
};

export const sendPageViewEvent = (pageType: PageTypes) => {
  try {
    mixpanel.track("Page view", { page: pageType });
  } catch {
    undefined;
  }
};

export const sendLinkClickedEvent = (props: ILinkClickedProps) => {
  try {
    mixpanel.track("Link clicked", {
      destination_url: props.link,
      link_type: props.type,
      page_location: props.location,
    });
  } catch {
    undefined;
  }
};

export const sendNavigationClickedEvent = (pageType: PageTypes) => {
  try {
    mixpanel.track("Navigation clicked", {
      page: pageType,
    });
  } catch {
    undefined;
  }
};
