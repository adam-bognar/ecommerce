
type Props = {
    name: string
}

const FooterLink = ({name}: Props) => {
    return (
        <a href="/products" className="text-sm hover:text-white">
            {name}
        </a>
    )
}

export default FooterLink