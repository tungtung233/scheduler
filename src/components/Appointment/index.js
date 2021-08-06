import React from 'react'

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    
  );

  const { bookInterview } = props;
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(interview.student, interview.interviewer)
  }
  

  return (
    // <>
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          // bookInterview={props.bookInterview}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}

      
    </article>
    /* <article className="appointment">
      <Header time="1pm"/>
    </article>
    </> */

  )
}


