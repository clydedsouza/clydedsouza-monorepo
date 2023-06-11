export interface IProjectData {
  data: IProject[]
}

export interface IProject {
  id: string
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
}
