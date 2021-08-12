import React from "react";
import "components/InterviewerListItem.scss";
const classnames = require("classnames");

/* props recieved
 * key:number - the id of the interviewer
 * name:string - the name of the interviewer
 * avatar:url - a url to an image of the interviewer
 * selected:boolean - to determine if an interview is selected or not
 * setInterviewer:function - sets the interviewer upon selection
 */

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li onClick={setInterviewer} className={interviewerClass}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
