interface LabelProps{
  name: string
}

export default function Label({name}:LabelProps) {
  return (
    <div className="flex-grow sm:flex-grow-0 py-1 px-3 bg-slate-200 text-black text-center cursor-pointer rounded-lg hover:font-bold duration-200">
      {name}
    </div>
  )
}
