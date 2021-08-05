export default function getAppointmentsForDay(state, day) {
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
