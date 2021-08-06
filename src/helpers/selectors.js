export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(element => element.name === day);

  if (filteredDay[0]) {
    const appointments = filteredDay[0].appointments
  
    const arrayOfAppointmentInfo = [];
    appointments.forEach(appointment => {
      arrayOfAppointmentInfo.push(state.appointments[appointment])  
    })
  
    return arrayOfAppointmentInfo
  }
  
  return [];
}

export function getInterview(state, interview) {

  if (interview !== null) {
    const interviewerId = interview.interviewer;

    
    const interviewData = {};
    
    interviewData.student = interview.student;
    interviewData.interviewer = state.interviewers[interviewerId]
    
    console.log(interviewData)
    return interviewData;
  }

  return null;
}
