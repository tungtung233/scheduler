import React from "react";
import Button from "components/Button";

/* props received:
 * message:String eg. "Delete the appointment?"
 * onCancel:Function
 * onConfirm:Function
 */

export default function Confirm(props) {
  //when the 'Cancel' button has been clicked- call props.onCancel
  const cancelDelete = function () {
    props.onCancel();
  };

  //when the 'Confirm' button has been clicked- call props.onConfirm
  const confirmDelete = function () {
    props.onConfirm();
  };

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={cancelDelete}>
          Cancel
        </Button>
        <Button danger onClick={confirmDelete}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
