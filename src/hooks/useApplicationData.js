import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function updateSpots(state) {
    const currentDay = state.day;

    //contains all the details about that day - including interviews scheduled
    const currentDayObj = state.days.find(
      (dayObj) => dayObj.name === currentDay
    );
    const currentDayObjIndex = state.days.findIndex(
      (dayObj) => dayObj.name === currentDay
    );

    //containts an array of the current day's appointment IDs
    const currentDayAllApps = currentDayObj.appointments;

    //checks to make sure that the appointment value is "null"
    const currentDayFreeApps = currentDayAllApps.filter(
      (appId) => !state.appointments[appId].interview
    );

    const freeSpots = currentDayFreeApps.length;

    //we need to update the sate with the new number of freeSpots -
    //in state, spots is found under days --> days[{name: "Monday", spots: 4}, {name: "Tuesday", spots: 2}]
    // ^notice how this is an *array* of objects, hence why we need to find the index of the current day in the days array
    //cannot directly change the state - right now to get the value of 'freeSpots' we are directly referencing the state (but not manipulating it)

    const updatedState = { ...state };

    //makes a copy of the days array from state, rather than referencing it
    updatedState.days = [...state.days];
    //makes a copy of the current day object from state ('currentDayObj' was a reference to the state, so updating spots in currentDayObj would change the state)
    const updatedDay = { ...currentDayObj };
    //updates the number of free spots in the copy of the current day obj
    updatedDay.spots = freeSpots;
    //updates the entire current day object in the copied state object
    updatedState.days[currentDayObjIndex] = updatedDay;

    return updatedState;
  }

  //id = appointment id
  //interview = details about student and interviewer
  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        setState({
          ...state,
          appointments,
        });

        setState((prev) => updateSpots(prev));
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      setState({
        ...state,
        appointments,
      });

      setState((prev) => updateSpots(prev));
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
