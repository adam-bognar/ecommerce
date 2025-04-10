import { Menu } from "lucide-react"

type Props = {
    setIsOpen: (value: boolean) => void
    isOpen: boolean
}

const LogoAndMenu = ({isOpen,setIsOpen}: Props) => {
  return (
    <div className="flex flex-row justify-center items-center gap-4">
              <div className="lg:hidden">
                <button
                  className="border border-gray-300 rounded-lg p-3 hover:bg-neutral-700 active:bg-gray-150 cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Menu className="h-4 w-4 text-white"/>
                </button>
              </div>
              <div>
                <a href="/ecommerce/" className="text-2xl font-bold text-white">
                  ShopNow
                </a>
              </div>
            </div>
  )
}

export default LogoAndMenu