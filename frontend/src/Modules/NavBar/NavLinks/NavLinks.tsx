import NavBarLink from "../NavBarLink/NavBarLink"

type Props = {}

const NavLinks = (props: Props) => {
  return (
    <nav className="hidden lg:flex items-center justify-center gap-8">
            <NavBarLink name="Termékek" />

            {/* <NavBarLink name="Kész figurák" />
            <NavBarLink name="DIY" />
            <NavBarLink name="Előfizetéses csomagok" /> */}
          </nav>
  )
}

export default NavLinks