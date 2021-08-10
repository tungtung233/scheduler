import React from "react";
import axios from "axios";

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
  getByTestId, 
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


  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
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

    //Sylvia Palmer is the interviewer we are selecting
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
  
  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))

    //gets all the appointments for the day (articles), in an array, then finds the appointment booked by 'Archie Cohen'
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    //a booked appointment will show the delete icon, alt-text is 'Delete'
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    //Verifing that after entering a new appointment, we see the 'Deleting' component
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    //checks that the add button is now showing
    await waitForElement(() => getByAltText(appointment, "Add"));

    //after deleting the appointment under 'Monday', we should have '2 spots remaining'
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))

    
    //gets all the appointments for the day (articles), in an array, then finds the appointment booked by 'Archie Cohen'
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    //a booked appointment will show the edit icon, alt-text is 'Edit'
    fireEvent.click(getByAltText(appointment, "Edit"));

    //enter the value 'Lydia Miller-Jones' as the student name
    fireEvent.change((getByTestId(appointment, "student-name-input")), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText(appointment, "Save"));

    //Verifing that after entering a new appointment, we see the 'Saving' component
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //checks that 'Lydia Miller-Jones' is now showing - it was the student name we just tried to save
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));


    //after saving a new appointment under 'Monday', we should have '1 spot remaining'
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });


  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);
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

    //'Could not save appointment' is the error message that should appear
    await waitForElement(() => getByText(appointment, "Could not save appointment"));

    //Closing the error message 
    fireEvent.click(getByAltText(appointment, "Close"))

    //an empty appointment will show the plus icon, alt-text is 'Add'
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();

  });
  

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))

    //gets all the appointments for the day (articles), in an array, then finds the appointment booked by 'Archie Cohen'
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    //a booked appointment will show the delete icon, alt-text is 'Delete'
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    //Verifing that after entering a new appointment, we see the 'Deleting' component
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    //'Could not delete appointment' is the error message that should appear
    await waitForElement(() => getByText(appointment, "Could not delete appointment"));

    //Closing the error message 
    fireEvent.click(getByAltText(appointment, "Close"))

    //Verify that Archie Cohen's appointment is still there
    expect(queryByText(appointment, "Archie Cohen")).toBeInTheDocument();

  });

  
})