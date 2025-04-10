import { X } from "lucide-react"

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const MobileMenu = ({isOpen, setIsOpen}: Props) => {
  return (
    <div
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <a href="/" className="text-2xl font-bold text-primary">
              ShopNow
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="border border-gray-300 rounded-lg p-3 hover:bg-gray-100 active:bg-gray-150 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex flex-col p-4">
          <a
              href="#"
              className="py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Fiók
            </a>
            <a
              href="#"
              className="py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Kész figurák
            </a>
            <a
              href="#"
              className="py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dobozok
            </a>
            <a
              href="#"
              className="py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Előfizetéses csomagok
            </a>
          </nav>
        </div>
      </div>
  )
}

export default MobileMenu