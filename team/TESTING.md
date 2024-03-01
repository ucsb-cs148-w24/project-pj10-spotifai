Unit Tests
- We used Codeium to generate the base code for the unit tests and edit them to fit our needs
- Our test will test each event initiated in the component, test the relevant states used/changed in the component, and the efficacy of our API/backend calls
- We first implemented a unit test in the Jest library for the Login components that verifies the state of the user, verifies the API call token/user/etc, and verifies that the component is displaying properly
- In the future, we aim to create unit tests for each component so that we can test each part of the project individually and better identify issues at their root

Testing Framework
- We use the Jest testing framework to write our tests (tried to use Enzyme as well but found Jest to be better in testing our API calls)
- Extensive support for JS and React including individual component and feature testing, API/backend call testing, and connectivity between components
