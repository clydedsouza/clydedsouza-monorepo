import { IProject } from '../../../../Api/IProjectData'
import './MadeUsing.scss'

function MadeUsing(props: Partial<IProject>) {
  if (!props.madeUsing || props.madeUsing.length < 1) return <></>

  return (
    <div className="made-using">
      {props.madeUsing &&
        props.madeUsing.map((item) => <span key={item}>{item}</span>)}
    </div>
  )
}

export default MadeUsing
