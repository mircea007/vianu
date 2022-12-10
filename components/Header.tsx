export function Header({ className }){
  return (
    <div className={"w-full p-3 bg-main-700 " + className}>
      <h1 className="text-5xl italic">
        <span className="text-main-400">Vianu</span>
        <span className="text-white">Arena
          <sup className="text-3xl">*</sup>
        </span>
      </h1>
    </div>
  )
}