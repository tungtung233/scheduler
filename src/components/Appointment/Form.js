import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { action } from '@storybook/addon-actions/dist/preview';

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

  const reset = function() {
    setName("");
    setInterviewer(null)
  }
  
  const cancel = function() {
    reset()
    props.onCancel()
  }

  const save = function() {
    props.onSave(name, interviewer)
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
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
          />
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
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  

  )

}