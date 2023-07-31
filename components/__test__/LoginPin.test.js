// import React from "react";
// import renderer from "react-test-renderer";

// import LoginPin from "../LoginPin";

// describe('LoginPin', () => {
//     it("Login Pin", () => {
//         const mockOnSubmit = jest.fn();
//         const testRenderer = renderer.create(<LoginPin onSubmit={mockOnSubmit} />);
//         const root = testRenderer.root;

//         const codeField = root.findByProps({testID : 'codeField'});
//         codeField.props.onChangeText(6969);

//         expect(mockOnSubmit).toHaveBeenCalledWith(6969);
//     })
// })