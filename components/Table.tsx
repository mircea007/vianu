import type { ReactElement } from 'react'

interface TableProps {
  addIndexes?: boolean
  className?: string
  header: string[]
  data: (ReactElement | string)[][]
}

export default function Table( { header, data, className, addIndexes }: TableProps ){
  return (
    <table className={"my-table " + className}>
      <tbody>
        {/* table header */}
        <tr>{addIndexes ? (<th>Nr.</th>): null}{header.map( (col, idx) => (<th key={idx}>{col}</th>) )}</tr>

        {/* table contents */}
        {data.map( (row, idx) => (<tr key={idx} className={(idx & 1) ? "row-even" : "row-odd"}>
          {addIndexes ? (<td>{1 + idx}</td>) : null}
          {row.map( (el, idx2) => ( <td key={idx2}>{el}</td> ) )}
        </tr>) )}
      </tbody>
    </table>
  )
}
