export interface IProjectTileProps {
  name: string
  image: string
  description: string
}

function ProjectTile(props: IProjectTileProps) {
  return (
    <div>
      <p>Project {props.name}</p>
      <p>ifbwebfwebfi</p>
    </div>
  )
}

export default ProjectTile
