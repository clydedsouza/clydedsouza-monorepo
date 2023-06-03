export interface IProjectTileProps {
  name: string
  image: string
  description: string
}

function ProjectTile(props: IProjectTileProps) {
  const { name, image, description } = props
  return (
    <div>
      <p>Project</p>
      <p>ifbwebfwebfi</p>
    </div>
  )
}

export default ProjectTile
