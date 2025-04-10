type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const Overlay = ({isOpen,setIsOpen}: Props) => {
  return (
    <div
        className={`fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-40 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      />
  )
}

export default Overlay