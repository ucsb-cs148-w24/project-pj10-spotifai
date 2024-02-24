Unit Tests
- We used Codeium to generate the base code for the unit tests and edit them to fit our needs
- Our test will test each event initiated in the component, test the relevant states used/changed in the component, and the efficacy of our API/backend calls
- We first implemented a unit test in the Jest library for the Login components that verifies the state of the user, verifies the API call token/user/etc, and verifies that the component is displaying properly
- In the future, we aim to create unit tests for each component so that we can test each part of the project individually and better identify issues at their root

Testing Framework
- We use the Jest testing framework to write our tests (tried to use Enzyme as well but found Jest to be better in testing our API calls)
- Extensive support for JS and React including individual component and feature testing, API/backend call testing, and connectivity between components

Component Test
1. We implemented tests via the Jest library and simulated processes like verification and wrote validation criteria all by Jest's inbuilt functions.
2. Jest is quite functional — we will use keep using it for any tests for unit tests or full components/end-to-end integration too.
3. We did a full component test by writing a test suite that tests the full process of clicking a button with a loaded query to having that song found on youtube jump to a new tab. We give the component a query and api key and then use Jest to click a button and make sure a youtube link is properly opening via window.open.
4. I think for small items like this, it would be alright not to integrate a unit test, because the amount of things that you need to test for a small functionality like this is just some mild edges cases (i.e. no song is loaded/playing). For big components that have to handle a lot of possible cases or have more error points, writing a test suite to automate the page would make more sense.
