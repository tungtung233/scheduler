import React from "react";

/*props received:
 * student:String eg. "Lydia Miller-Jones"
 * interviewer:Object we can use the interview object that already exists in stories/index.js for this
 * onEdit:Function to be called when the user clicks the Edit button
 * onDelete:Function to be called when the user clicks the Delete button
 */

export default function Show(props) {
  const editApp = function () {
    props.onEdit();
  };

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
