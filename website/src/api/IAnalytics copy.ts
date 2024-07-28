export const MIXPANEL_DEV_PROJECT_ID = '6c905af7861c30571d76bbc6d67696ef'
export const MIXPANEL_PROD_PROJECT_ID = '50f70ae3a52dd646aea4025dc1f30a06'

export enum AnalyticsLinkType {
  Cta = 'Cta',
  SocialIcons = 'Social icons',
  CardGitHub = 'GitHub',
  CardWebsite = 'Website',
  GeneralWebsite = 'External website',
}

export interface ILinkClickedProps {
  link?: string
  type?: AnalyticsLinkType
  location?: string
}
