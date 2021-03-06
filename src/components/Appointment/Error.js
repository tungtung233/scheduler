import React from "react";

/*props received:
 * message:String eg. "Could not delete appointment."
 * onClose:Function
 */

export default function Error(props) {
  //when the X icon has been clicked- call props.onClose
  const errorBack = function () {
    props.onClose();
  };

  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={errorBack}
      />
    </main>
  );
}
