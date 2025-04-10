import { Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Link } from 'wouter'
import { Product } from '../../Models'
import AddToCartButton from '../AddToCartButton/AddToCartButton'

type Props = {
    product: Product
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

const ShoppingItem = ({ product }: Props) => {
    const [width, setWidth] = useState(0);
    const itemRef = useRef<HTMLDivElement>(null);

    const reviews =product.reviews || []
    const avg = reviews.reduce((acc, review) => acc + review.rating, 0) / (reviews.length || 1);

    const difficultyText = difficultyMap[product.difficulty] || product.difficulty;
    const difficultyColor = difficultyColorMap[product.difficulty] || "bg-gray-100 text-gray-800";
  
    
    useEffect(() => {
        if (!itemRef.current) return;
        
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    // For modern browsers
                    const contentBoxSize = Array.isArray(entry.contentBoxSize) 
                        ? entry.contentBoxSize[0] 
                        : entry.contentBoxSize;
                    setWidth(contentBoxSize.inlineSize);
                } else {
                    // Fallback for older browsers
                    setWidth(entry.contentRect.width);
                }
            }
        });
        
        resizeObserver.observe(itemRef.current);
        
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <Link
            href={`/products/${product.id}`}
            className="border border-neutral-700 lg:max-w-[300px] bg-neutral-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:cursor-pointer group flex flex-col w-full h-full"
            onClick={() => {
                
            }}
        >
            <div className="relative overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${difficultyColor}`}
                    >
                        {difficultyText}
                    </span>
                </div>
            </div>
            <div ref={itemRef} className="p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    <div className={"flex items-center"}>
                        <div className="flex mr-1">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    size={12}
                                    className={index < Math.floor(avg || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                                />
                            ))
                            }
                        </div>
                        <span className={"text-sm text-gray-400"}>({avg || 0})</span>
                    </div>
                </div>
                {/*this row*/}
                <div className={`flex ${width > 220 ? 'flex-row items-center' : 'flex-col'} justify-between mt-2 gap-2`}>
                    <span className="text-xl font-bold text-white">{product.price} Ft</span>
                    <AddToCartButton id={product.id} />
                </div>
            </div>
        </Link>
    )
}

export default ShoppingItem