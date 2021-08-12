import React from "react";

/*props received:
 * student:String eg. "Lydia Miller-Jones"
 * interview:Object - contains all details about this particular appointment - including interviewer name, id and avatar
 * onEdit:Function
 * onDelete:Function
 */

export default function Show(props) {
  //when clicking the Edit Icon - calls props.onEdit
  const editApp = function () {
    props.onEdit();
  };

  //when clicking the Delete Icon - calls props.onDelete
  const deleteApp = function () {
    props.onDelete();
  };

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular" data-testid="student-name">
          {props.student}
        </h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interview.interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={editApp}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={deleteApp}
          />
        </section>
      </section>
    </main>
  );
}
