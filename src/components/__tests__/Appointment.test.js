/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment";


/*
  A test that renders a React Component
  -- seems to be a useless test? 
  "These tests aren't very useful anymore since every other test in the same file renders the component being tested."
*/
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
