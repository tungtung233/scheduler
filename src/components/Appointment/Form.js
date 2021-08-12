import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
// import { action } from '@storybook/addon-actions/dist/preview';

/* props received:

*EDIT MODE:*
  * name:String - student name
  * interviewers:Array - all the interviewers available that appointment slot
  * interviewer:Number - the particular interviewer selected for this appointment
  * onSave:Function
  * onCancel:Function

*CREATE MODE:*
  * interviewers:Array - all the interviewers available that day
  * onSave:Function
  * onCancel:Function
*/

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //reset both the student name and the selected interviewer
  const reset = function () {
    setName("");
    setInterviewer(null);
  };

  const cancel = function () {
    reset(); //resets the form
    props.onCancel();
  };

  //ensures that the user has entered a student name and has selected an interviewer
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }

    setError(""); //clear the error
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          autoComplete="off"
          id="appointment__form"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange={(event) => setName(event.target.value)}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
