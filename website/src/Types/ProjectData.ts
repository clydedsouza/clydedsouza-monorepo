export interface IProjectData {
  app: IMetadata
  data: IProject[]
}

export interface IMetadata {
  dist: string
  name: string
  version: string
}

export interface IProject {
  id: string
  contents: string
  title: string
  date: string
  description: string
  hasWebsite: boolean
  website: string
  onGithub: boolean
  github: string
  madeUsing: string[]
  category: string
  image: string
  imageDescription: string
  excerpt: string
}
