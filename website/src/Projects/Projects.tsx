export interface IProjectProps {
  name: string
}

function Projects(props: IProjectProps) {
  return (
    <div>
      <p>Project {props.name}</p>
      <p>ifbwebfwebfi</p>
    </div>
  )
}

export default Projects
