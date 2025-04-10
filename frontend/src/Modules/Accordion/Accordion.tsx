import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "preact/hooks"

type Props = {
    value: string
  title: string
  children: React.ReactNode
}

export function Accordion({value, title, children}: Props) {

    const [isOpen, setIsOpen] = useState(false)
    
  
    const contentRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number | undefined>(0)

    const handleToggle = () => {
        setIsOpen(!isOpen)
      }
  
    useEffect(() => {
      if (isOpen) {
        const contentHeight = contentRef.current?.scrollHeight
        setHeight(contentHeight)
      } else {
        setHeight(0)
      }
    }, [isOpen])
  
    return (
      <div className="border-b border-white justify-between mx-5">
        <button
          type="button"
          onClick={() => handleToggle()}
          className="flex w-full pr-5 items-center text-white justify-between py-4 font-medium hover:cursor-pointer"
          aria-expanded={isOpen}
          aria-controls={`content-${value}`}
          id={`heading-${value}`}
        >
          {title}
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <div
          id={`content-${value}`}
          role="region"
          aria-labelledby={`heading-${value}`}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ height: height ? `${height}px` : "0px" }}
        >
          <div ref={contentRef} className="pb-4 pt-0">
            {children}
          </div>
        </div>
      </div>
    )
}

