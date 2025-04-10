import { Product } from "../../Models"
import { MobileShoppingItem } from "./MobileShoppingItem"

type Props = {
    products: Product[],
    setIsOpen?: (isOpen: boolean) => void
}

export function MobileShoppingList({ products , setIsOpen}: Props) {
    return (
        <div className={"w-full m-5 flex flex-col"}>
            <div className="  bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg shadow-sm overflow-hidden mt-5">
                {products.map((product, index) => (
                    <MobileShoppingItem key={index} product={product} setIsOpen={setIsOpen}/>
                ))}
            </div>
        </div>

    )
}

export default MobileShoppingList