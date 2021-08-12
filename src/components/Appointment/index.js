import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

/*props received:
 * key: appointment id number
 * id: appointment id number
 * time: appointment time (comes from the db)
 * interview: contains all the details about the interview, including student name, interviewer id, name and avatar
 * interviewers: contains all interviewers available for that appointment slot
 * bookInterview: function
 * cancelInterview: function
 */

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  //this is how it knows which appointment mode to begin showing
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const { bookInterview, cancelInterview } = props;

  //name = student name that user entered
  //interviewer = id of interviewer selected
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    //'true' - if there is an error with saving, then cancelling will bring the user back to the visual mode of EMPTY, instead of the CREATE form
    transition(SAVE, true);

    //if this promise resolves, state will get updated with the new appointment details and spots available will also update. Else error visual will show
    bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  //pressing the Edit Icon will show the Edit visual mode
  function editAppointment() {
    transition(EDIT);
  }

  //pressing the Delete Icon will show the Delete confirmation visual mode
  function deleteAppointment() {
    transition(CONFIRM);
  }

  function confirmDeleteAppointment() {
    transition(DELETE, true);

    //if this promise resolves, state will get updated (appointment will be empty) and spots available will also update. Else error visual will show
    cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  //if there is an error, pressing the X will run back()
  function errorBack() {
    back();
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
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
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === SAVE && <Status message={"Saving"} />}
      {mode === ERROR_SAVE && (
        <Error message={"Could not save appointment"} onClose={errorBack} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Delete the appointment?"}
          onCancel={() => transition(SHOW)}
          onConfirm={confirmDeleteAppointment}
        />
      )}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === ERROR_DELETE && (
        <Error message={"Could not delete appointment"} onClose={errorBack} />
      )}
    </article>
  );
}
