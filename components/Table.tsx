interface TableProps<RowType> {
  data: any[], // ar trebui sa fie RowType, trebuie sa repar la un moment dat
  header: { name: string, prop: string }[],
  className?: string
  addIndexes?: boolean
}

export function Table<RowType>( { data, header, className, addIndexes }: TableProps<RowType> ){

  return (
    <table className={className}>
      <tbody>
        {/* table header */}
        <tr>{addIndexes ? (<th>Nr.</th>): null}{header.map( (col, idx) => (<th key={idx}>{col.name}</th>) )}</tr>
        {/* table contents */}
        {data.map( (row, idx) => (<tr key={idx} className={(idx & 1) ? "even" : "odd"}>
          {addIndexes ? (<td>{1 + idx}</td>) : null}
          {header.map( (col, idx2) => ( <td key={idx2}>{row[col.prop]}</td> ) )}
        </tr>) )}
      </tbody>
    </table>
  )
}
