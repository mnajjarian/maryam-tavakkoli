import React from "react";
import Author from "..";
import { render } from "test-utils";

test("renders Author without crashing ", async () => {
  const component = render(<Author />);
  expect(component.container).toMatchSnapshot();
});
