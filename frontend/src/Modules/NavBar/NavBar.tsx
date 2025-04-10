
import { useEffect, useState } from "preact/hooks"
import MobileMenu from "../MobileMenu/MobileMenu"
import Overlay from "../MobileMenu/Overlay"
import NavLinks from "./NavLinks/NavLinks"
import ActionButtons from "./ActionButtons/ActionButtons"
import LogoAndMenu from "./LogoAndMenu/LogoAndMenu"
import { SearchOverlay } from "../SearchOverlay/SearchOverlay"

type Props = {
}

const NavBar = ({  }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearchOpen = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <>
      <header className="bg-neutral-900">
        <div class={"flex flex-col items-center justify-center w-full px-4 py-4"}>
          <div className="flex flex-row w-full justify-between items-center">
            <LogoAndMenu setIsOpen={setIsOpen} isOpen={isOpen} />
            <NavLinks />
            <ActionButtons setSearchOpen={handleSearchOpen} />
          </div>
        </div>
      </header>


      <SearchOverlay isOpen={isSearchOpen} setIsOpen={handleSearchOpen} />
      <Overlay isOpen={isOpen || isSearchOpen} setIsOpen={setIsOpen} />
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default NavBar

