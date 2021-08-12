# Interview Scheduler

Interview Scheduler is a simple interview appointment scheduling tool. This webapp was developed with the goal of learning React, with the back-end provided by Lighthouse Labs.

Students are able to book an appointment with a mentor by clicking on an empty timeslot (indicated by the plus icon) - they can then enter their name and select a mentor from those who are available during that day. Appointments can be booked for different weekdays and times, and can also be edited or deleted.

This app was deployed online through Heroku, CircleCI and Netlify. It can be found here - https://scheduler-ytl.netlify.app/
(Please give the app a few moments to start up the API and load the data)

## Final Product

(https://raw.githubusercontent.com/tungtung233/scheduler/master/docs/Scheduler.gif)

_Creating, editing and deleting an appointment_
!["Creating, editing and deleting an appointment"](https://raw.githubusercontent.com/tungtung233/scheduler/master/docs/Scheduler%20-%20Create%2C%20Edit%2C%20Delete%20an%20Appointment.gif)

_Saving and deleting an appointment - error messages_
!["Saving and deleting an appointment - error messages"](https://raw.githubusercontent.com/tungtung233/scheduler/master/docs/Scheduler%20-%20Saving%2C%20Deleting%20Errors.gif)

## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-hooks-testing-library
- react-scripts

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the Webpack Development Server (using the `npm start` command).
  - This should open up your browser and direct you to `http://localhost:8000/`
- You can run the Jest Test Framework using the `npm test` command.
- You can also run the Storybook Visual Testbed with the `npm run storybook` command.
