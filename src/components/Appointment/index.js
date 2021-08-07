import React from 'react'

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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

    transition(SAVE, true)

    bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  function editAppointment() {
    transition(EDIT)
  }

  function deleteAppointment() {
    transition(CONFIRM)
  }

  function confirmDeleteAppointment() {
    transition(DELETE, true)

    cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }

  function errorBack() {
    back()
  }


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interview={props.interview}
          onEdit={editAppointment}
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
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.id}
          onSave={save}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === SAVE && <Status message={"Saving"} />}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={errorBack} />}
      {mode === CONFIRM && (
        <Confirm 
          message={"Delete the appointment?"} 
          onCancel={() => transition(SHOW)}
          onConfirm={confirmDeleteAppointment}
        />
      )}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === ERROR_DELETE && <Error message={"Could not delete appointment"} onClose={errorBack} />}
      
    </article>

  )
}


