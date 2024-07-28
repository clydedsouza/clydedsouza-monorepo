export const MIXPANEL_DEV_PROJECT_ID = "6c905af7861c30571d76bbc6d67696ef";

export enum AnalyticsLinkType {
  Cta = "Cta",
  SocialIcons = "Social icons",
  CardGitHub = "GitHub",
  CardWebsite = "Website",
  GeneralWebsite = "External website",
}

export interface ILinkClickedProps {
  link?: string;
  type?: AnalyticsLinkType;
  location?: string;
}
