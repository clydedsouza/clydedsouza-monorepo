export interface IProjectData {
  app: IMetadata
  data: IProject[]
}

export interface IMetadata {
  config: string
  cwd: string
  deterministicOrder: boolean
  display: boolean
  dist: string
  filePattern: string
  ignore: string
  port: number
  server: boolean
  src: string
  name: string
  metadata: boolean
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
  icon: string
  image: string
  imageDescription: string
  relativeURL: string
  isActive: boolean
  excerpt: string
}
