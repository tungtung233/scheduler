import React from "react";

import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  queryByText,
  getByText, 
  getByAltText,
  getByPlaceholderText,
  prettyDOM, 
  getAllByTestId 
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });


  it.only("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))

    //gets all the appointments for the day (articles), in an array
    const appointments = getAllByTestId(container, "appointment");
    // reference the first appointment - it is a blank appointment
    const appointment = appointments[0]
    
    //an empty appointment will show the plus icon, alt-text is 'Add'
    fireEvent.click(getByAltText(appointment, "Add"));
    
    //enter the value 'Lydia Miller-Jones' as the student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //Sylvia Palmer's appointment is the one we are editing
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    //Verifing that after entering a new appointment, we see the 'Saving' component
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //checks that 'Lydia Miller-Jones' is now showing - it was the student name we just tried to save
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));


    //after saving a new appointment under 'Monday', we should have 'no spots remaining'
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();


  });
  
  

})