import React, { ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  heads: string[]
}
function Table(props: TableProps): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          {props.heads.map(head => (
            <th key={head}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  )
}

export default Table
