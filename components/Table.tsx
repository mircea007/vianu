export function Table<RowType>( { data, header, className }: { data: RowType[], header: { name: string, prop: string }[], className?: string } ){
  return (
    <table className={className}>
      <tbody>
        <tr>{header.map( col => (<th>{col.name}</th>) )}</tr>
        {data.map( (row, idx) => (<tr key={idx} className={(idx & 1) ? "even" : "odd"}> {
          header.map( col => ( <td>{row[col.prop]}</td> ) )
        }</tr>) )}
      </tbody>
    </table>
  )
}