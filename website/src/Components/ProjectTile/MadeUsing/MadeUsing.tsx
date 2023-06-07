import { IProject } from '../../../Types/ProjectData'
import './MadeUsing.scss'

function MadeUsing(props: IProject) {
  return (
    <div className="made-using">
      {props.madeUsing &&
        props.madeUsing.map((item) => <span key={item}>{item}</span>)}
    </div>
  )
}

export default MadeUsing
