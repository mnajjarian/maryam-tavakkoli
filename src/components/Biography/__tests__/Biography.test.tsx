import React from "react";
import { shallow } from "enzyme";
import Biography from "..";
import { DataContext } from "../../../contexts/dataContext";

test("render component", () => {
  const profile = {
    name: "Maryam Tavakkoli",
    image: "/maryam.jpg",
    biography: "My name is..."
  };

  const component = shallow(
    <DataContext.Provider value={{ data: profile }}>
      <Biography />
    </DataContext.Provider>
  );

  expect(component).toMatchSnapshot();
});
