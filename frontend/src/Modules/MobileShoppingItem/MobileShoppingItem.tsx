import { Link } from "wouter"
import { Product } from "../../Models"
import AddToCart from "../ProductDetails/AddToCart"

type Props = {
  product: Product,
  setIsOpen?: (isOpen: boolean) => void
}

// Map for difficulty translations
const difficultyMap = {
  "Easy": "Könnyű",
  "Medium": "Közepes",
  "Hard": "Nehéz"
};

// Map for difficulty colors
const difficultyColorMap = {
  "Easy": "bg-green-100 text-green-800",
  "Medium": "bg-yellow-100 text-yellow-800",
  "Hard": "bg-red-100 text-red-800"
};

export function MobileShoppingItem({ product, setIsOpen }: Props) {

  const difficultyText = difficultyMap[product.difficulty] || product.difficulty;
  const difficultyColor = difficultyColorMap[product.difficulty] || "bg-gray-100 text-gray-800";

  return (
    <Link
      href={`/products/${product.id}`}
      onClick={() => {
        setIsOpen(false)
        console.log("clicked")
      }}
      className="bg-neutral-700 flex flex-row justify-between gap-3 p-2 border-b border-gray-100 group hover:bg-neutral-600 transition-colors cursor-pointer">
      <div className={"flex flex-row items-center gap-4"}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-25 w-25 object-cover rounded"
        />
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-bold truncate text-white">{product.name}</h3>
          <span
            className={`text-md font-medium rounded-full px-2 py-0.5 inline-block mt-1 ${difficultyColor}`}
          >
            {difficultyText}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 mx-4">
        <span className="text-2xl font-bold text-white">{product.price} Ft</span>
        <AddToCart id={product.id} />
      </div>
    </Link>
  )
}
