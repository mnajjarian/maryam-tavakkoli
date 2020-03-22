import React, { ChangeEvent } from 'react'
import { BlockTypes } from '../StyleTypes'
interface HeaderStyleDropdownProps {
  headerOptions: BlockTypes
  active: string
  onToggle: (value: string) => void
}
function HeaderStyleDropdown(props: HeaderStyleDropdownProps): JSX.Element {
  const { onToggle, active, headerOptions } = props
  const handleToggle = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value
    onToggle(value)
  }
  return (
    <div className="RichEditor-headers">
      <select className="RichEditor-headers-select" value={active} onChange={handleToggle}>
        <option className="RichEditor-headers-option" key="unstyled" value="unstyled">
          Normal
        </option>
        {headerOptions.map(heading => (
          <option className="RichEditor-headers-option" key={heading.label} value={heading.style}>
            {heading.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default HeaderStyleDropdown
