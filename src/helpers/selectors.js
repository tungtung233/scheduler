export function getAppointmentsForDay(state, day) {
  //gets all the details for that particular selected day only
  const filteredDay = state.days.filter((element) => element.name === day);

  if (filteredDay[0]) {
    //creates an array of appointment IDs
    const appointments = filteredDay[0].appointments;

    //using the appointment ID, creates an array (arrayOfAppointmentInfo) containing the appointment info (including appointment time, student name, interviewer id)
    const arrayOfAppointmentInfo = [];

    appointments.forEach((appointment) => {
      arrayOfAppointmentInfo.push(state.appointments[appointment]);
    });

    return arrayOfAppointmentInfo;
  }

  return [];
}

export function getInterviewersForDay(state, day) {
  //gets all the details for that particular selected day only
  const filteredDay = state.days.filter((element) => element.name === day);

  if (filteredDay[0]) {
    //based on the available interviewers for this particular day, creates an array of those interviewer's IDs
    const interviewers = filteredDay[0].interviewers;

    //using the interviewers' IDs, creates an array (arrayOfInterviewerInfo) containing the interviewers details (including their id, name and avatar)
    const arrayOfInterviewerInfo = [];
    interviewers.forEach((interviewerId) => {
      arrayOfInterviewerInfo.push(state.interviewers[interviewerId]);
    });

    return arrayOfInterviewerInfo;
  }

  return [];
}

//interview parameter only returns the interviewer ID - we need to crossreference the interviewer ID with the state data to find the interviewers details (name, avatar)
export function getInterview(state, interview) {
  if (interview !== null) {
    const interviewerId = interview.interviewer;

    const interviewData = {};

    interviewData.student = interview.student;
    interviewData.interviewer = state.interviewers[interviewerId];

    //returns an object containing the student's name and a nested object containing the interviewer's details
    return interviewData;
  }

  return null;
}
