import React from 'react'

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVE = "SAVE";
const DELETE = "DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const { bookInterview, cancelInterview } = props;
  

  //name = student name that user entered
  //interviewer = id of interviewer selected
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE)

    bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      // .catch(() => transition(ERROR))
  }


  function deleteAppointment() {
    console.log('inside delete appointment')
    transition(DELETE)
    cancelInterview(props.id)
      .then(() => transition(EMPTY))

  }


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppointment}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === SAVE && <Status message={"Saving"} />}
      {mode === DELETE && <Status message={"Deleting"} />}

      
    </article>

  )
}


