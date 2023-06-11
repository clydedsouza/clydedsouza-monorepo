export interface IProjectData {
  data: IProject[]
}

export interface IProject {
  id: string
  title: string
  date: string
  description: string
  website: string
  github: string
  madeUsing: string[]
  category: string
  image: string
  imageDescription: string
}
