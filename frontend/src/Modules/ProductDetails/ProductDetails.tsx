import { Product } from "../../Models"
import Stars from "../Stars/Stars"
import AddToCart from "./AddToCart"


type Props = {
    product: Product
}

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

const ProductDetails = ({ product }: Props) => {


    const difficultyText = difficultyMap[product.difficulty] || product.difficulty;
    const difficultyColor = difficultyColorMap[product.difficulty] || "bg-gray-100 text-gray-800";

    const reviews = product.reviews

    const avg = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

    return (
        <div className="mx-5">
            <div className="container mx-auto bg-gradient-to-br from-neutral-800 to-neutral-700 shadow-lg rounded-xl overflow-hidden my-12">
                <div className="md:flex">
                    <div className="md:w-1/2 items-center justify-center flex mt-10 md:mt-0">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-[400] h-[400px] object-cover rounded-xl aspect-[4/3]"
                        />
                    </div>
                    <div className="md:w-1/2 p-6">
                        <div className="mb-4">
                            <span
                                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${difficultyColor}`}
                            >
                                {difficultyText}
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>

                        <div className="flex items-center mb-4">
                            <Stars rating={avg} />
                            <span className="text-sm text-gray-400">{avg} ({reviews.length} reviews)</span>
                        </div>

                        <p className="text-2xl font-bold text-white mb-6">{product.price} Ft</p>

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-white mb-2">Description</h2>
                            <p className="text-gray-200">Lorem ipsum dolor sit amet</p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-white mb-2">Features</h2>
                            <ul className="list-disc pl-5 text-gray-200">
                                {/* {product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))} */}

                                <li>Feature 1</li>
                                <li>Feature 2</li>
                                <li>Feature 3</li>
                                <li>Feature 4</li>
                            </ul>
                        </div>
                        <div className="flex items-center justify-center space-x-4">

                            <AddToCart id={product.id}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductDetails