export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((element) => element.name === day);

  if (filteredDay[0]) {
    const appointments = filteredDay[0].appointments;

    const arrayOfAppointmentInfo = [];
    appointments.forEach((appointment) => {
      arrayOfAppointmentInfo.push(state.appointments[appointment]);
    });

    return arrayOfAppointmentInfo;
  }

  return [];
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter((element) => element.name === day);

  if (filteredDay[0]) {
    const interviewers = filteredDay[0].interviewers;

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
