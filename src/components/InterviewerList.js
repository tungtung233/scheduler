import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

/* props received:
 * interviewers:array - an array of objects containing the information of each interviewer
 * interviewer:number - the id of an interviewer
 * setInterviewer:function - a function that accepts an interviewer id
 */

function InterviewerList(props) {
  const { interviewers } = props;

  //goes through all the interviewers available for that day and creates an InterviewerListItem based on their data
  const parsedInterviewerList = interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewerList}</ul>
    </section>
  );
}

//ensures that the 'interviewers' prop that InterviewerList receives is an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
