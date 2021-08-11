import React from "react";
import DayListItem from "./DayListItem";

/* props received:
 * days:Array a list of day objects (each object includes an id, name, and spots)
 * day:String the currently selected day
 * setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
 */

export default function DayList(props) {
  const { days } = props;

  const parsedListItem = days.map((day) => (
    <DayListItem
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
      key={day.id}
    />
  ));

  return <ul>{parsedListItem}</ul>;
}
