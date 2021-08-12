import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  //returns an array containing all the appointments for the selected day
  let dailyAppointments = getAppointmentsForDay(state, state.day);

  //returns an array containing all the interviewers available for the selected day
  let dailyInterviewers = getInterviewersForDay(state, state.day);

  //goes through all the appointments for the day and creates an Appointment component for each appointment, based on that appointment's data
  const appointmentList = dailyAppointments.map((appointment) => {
    //returns an object containing the student's name and a nested object containing the interviewer's details
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
