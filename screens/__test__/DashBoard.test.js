// import React from 'react';
// import TestRenderer from 'react-test-renderer';
// import DashboardScreen from '../DashboardScreen';

// describe('DashboardScreen', () => {
//   it('navigates to the corresponding screen when a DashButton is pressed', async() => {
//     const navigationMock = {
//       push: jest.fn(),
//     };

//     const testRenderer = TestRenderer.create(
//       <DashboardScreen navigation={navigationMock} />
//     );
//     const testInstance = testRenderer.root;

//     const dashButtons = testInstance.findAllByType('DashButton');
//     for (let i = 0; i < dashButtons.length; i++) {
//       const dashButton = dashButtons[i];
//       await dashButton.props.onPress(); // Simulate button press
//     }

//     // Check if the corresponding navigation.push method was called with the expected screen name
//     expect(navigationMock.push).toHaveBeenNthCalledWith(1, 'TotRequest');
//     expect(navigationMock.push).toHaveBeenNthCalledWith(2, 'OverrideRequest');
//     expect(navigationMock.push).toHaveBeenNthCalledWith(3, 'WrrRequest');
//   });
// });
