import React from "react";
import Biography from "..";
import { DataContext } from "../../../contexts/dataContext";
import { render } from "@testing-library/react";

  const profile = {
    name: "Maryam Tavakkoli",
    image: "/maryam.jpg",
    biography: "My name is..."
  };
test("renders without crashing", () => {
  const component = render(
    <DataContext.Provider value={{ data: profile }}>
      <Biography />
    </DataContext.Provider>
  );
  expect(component.container).toMatchSnapshot();
});
