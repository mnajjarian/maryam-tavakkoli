import React from "react";
import Biography from "..";
import { render, rerender } from "test-utils";
import { async } from "q";

test("renders Biography without crashing", async () => {
  const component = render(<Biography />);
  expect(component.container).toMatchSnapshot();
});
