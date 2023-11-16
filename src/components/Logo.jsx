import { Snail} from "lucide-react"

function Logo({height="10", width="10", flex='col', isText=true, text="BlgZilla", className=""}) {
  return (
    <div className={`flex flex-${flex} font-medium font-serif items-center justify-center transition-colors duration-200 ease-in-out cursor-pointer hover:text-primary ${className}`}>
      <Snail className={`w-${width} h-${height} ${flex=='row' ? "mr-1" : ""}`} />
      {isText && <span>{text}</span>}
    </div>
  )
}

export default Logo