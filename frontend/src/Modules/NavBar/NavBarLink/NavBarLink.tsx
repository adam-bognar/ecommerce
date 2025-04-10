
type Props = {
    name: string
}

const NavBarLink = ({name}: Props) => {
    return (
        <a href="/products" className=" text-xl text-white font-bold hover:text-gray-400">
            {name}
        </a>
    )
}

export default NavBarLink