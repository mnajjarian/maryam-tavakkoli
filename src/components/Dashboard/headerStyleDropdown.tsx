import React from "react";
import { BlockTypes } from "./StyleTypes";
interface HeaderStyleDropdownProps {
  headerOptions: BlockTypes;
  active: string;
  onToggle: (value: string) => void;
}
const HeaderStyleDropdown = (props: HeaderStyleDropdownProps) => {
  const { onToggle, active, headerOptions } = props;
  const handleToggle = (event: any) => {
    let value = event.target.value;
    onToggle(value);
  };
  return (
    <div className="RichEditor-headers">
      <select
        className="RichEditor-headers-select"
        value={active}
        onChange={handleToggle}
      >
          <option>Normal</option>
        {headerOptions.map(heading => (
          <option
            className="RichEditor-headers-option"
            key={heading.label}
            value={heading.style}
          >
            {heading.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HeaderStyleDropdown;
