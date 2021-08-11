import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
// import { action } from '@storybook/addon-actions/dist/preview';

/* props received:

*EDIT MODE:*
  * name:String
  * interviewers:Array
  * interviewer:Number
  * onSave:Function
  * onCancel:Function

*CREATE MODE:*
  * interviewers:Array
  * onSave:Function
  * onCancel:Function
*/

export default function Form(props) {

  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("");
  
  const reset = function() {
    setName("");
    setInterviewer(null)
  }
  
  const cancel = function() {
    reset()
    props.onCancel()
  }


  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  }
  
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
          autoComplete="off" 
          id="appointment__form"
          onSubmit={event => event.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange={(event) => setName(event.target.value)}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
            /*
              This must be a controlled component
            */
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
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  

  )

}