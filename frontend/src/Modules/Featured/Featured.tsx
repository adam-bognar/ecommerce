import { Product } from "@/Models"
import ShoppingItem from "../ShoppingItem/ShoppingItem"

type Props = {
  title: string
  products: Product[]
}

const Featured = ({
  title,
  products
}: Props) => {
  return (
    <section id={"featured"} className={"bg-gradient-to-br from-neutral-800 to-neutral-700 py-10"}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center text-amber-300">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((prod) => (
                <ShoppingItem product={prod}/>
              ))}
            </div>
          </div>
        </section>
  )
}

export default Featured