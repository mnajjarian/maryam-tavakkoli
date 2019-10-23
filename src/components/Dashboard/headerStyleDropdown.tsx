import React from 'react';
import { BlockTypes } from './blockStyle';
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
    }
    return(
        <select value={active} onChange={handleToggle} >
            {headerOptions.map(heading =>
                <option key={heading.label} value={heading.style} >
                {heading.label}
                </option>
                )}
        </select>
    );
};

export default HeaderStyleDropdown;