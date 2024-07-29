import { IProject } from "@/api/IProjectData";
import "./Card.scss";
import Links from "./Links/Links";
import MadeUsing from "./MadeUsing/MadeUsing";

function Card(props: IProject) {
  return (
    <div className="card">
      <div
        style={{
          backgroundImage: `url(${props.image}), url("https://files.clydedsouza.net/site/project-placeholder.png")`,
        }}
        aria-label={props.imageDescription}
      >
        {props.category ? <span>{props.category}</span> : <></>}
      </div>
      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <MadeUsing {...props} />
        <Links {...props} />
      </div>
    </div>
  );
}

export default Card;
