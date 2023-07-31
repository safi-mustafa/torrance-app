import React from "react";
import renderer from "react-test-renderer";

import BlankScreen from "../BlankScreen";

describe("BlankScreen", () => {
    it('renders "Loading..." text', () => {
        const component = renderer.create(<BlankScreen />).root
        const textComponent = component.findByType('Text');
        expect(textComponent.props.children).toBe('Loading...');
    });
});