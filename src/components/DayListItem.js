import React from "react";
import "components/DayListItem.scss";
const classnames = require("classnames");

/*props received:
 * key: day id
 * name: String - the name of the day
 * spots: Number - the number of spots remaining
 * selected: Boolean - true or false declaring that this day is selected
 * setDay: Function - accepts the name of the day eg. "Monday", "Tuesday"
 */

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const formatSpots = function (spots) {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return `${spots} spots remaining`;
    }
  };

  //changes the <li> appearance based on if it's selected or full
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  return (
    <li onClick={() => setDay(name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
