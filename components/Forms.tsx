export function InputField( { type, value, onChange, comment, label, placeholder, className } ){
  let error = 1;
  if( !comment ){
    error = 0;
    comment = (<wbr />)
  }

  if( !className )
    className=""

  return (
    <div className={className}>
      <div className="p-1">
        <span className="text-lg font-bold mb-2">{label}</span>
        <br />
        <input
        className={"transition transition-all duration-300 float-right px-2 py-1 outline outline-2 rounded-lg " + (error ? "outline-red-300 focus:outline-red-400" : "outline-gray-300 focus:outline-main-300")}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        />
      </div> <br />
      <span className="test-md h-4 text-red-500">{comment}</span>
    </div>
  )
}

export function SubmitButton({ value, disabled }){
  return (
    <input
    className="font-bold uppercase bg-main-500 text-white p-2 rounded-lg hover:bg-main-600 cursor-pointer focus:outline focus:outline-2 focus:outline-main-300 disabled:bg-gray-300 disabled:text-gray-200 disabled:outline-0"
    type="submit"
    value={value ? value : "Submit"}
    disabled={disabled}
    />
  )
}