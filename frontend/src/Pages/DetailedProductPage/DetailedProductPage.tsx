import { useEffect, useState } from "preact/hooks";
import { useRoute } from "wouter";
import { Product } from "../../Models";
import ProductDetails from "../../Modules/ProductDetails/ProductDetails";
import Reviews from "../../Modules/Reviews/Reviews";
import { SimilarItems } from "../../Modules/SimilarItems/SimilarItems";
import { getProductByID } from "../../api";

type Props = {
};

export default function DetailedProductPage({  }: Props) {
  const [match, params] = useRoute<{ productID: string; section?: string }>(
    "/products/:productID"
  );
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
		const loadProduct = async () => {
			if (!params.productID) return; 
			setLoading(true); // Set loading to true before fetching
      const response = await getProductByID(parseInt(params.productID, 10));
			if (typeof response !== "string") {
				setProduct(response);
			} else {
				console.error("Error fetching product:", response);
				}
			setTimeout(() => {
				setLoading(false); // Set loading to false after fetching
			}, 300);
		};
		loadProduct();
	}, [params.productID]); 

  if (loading)
    return (
      <div
        className="flex items-center text-white justify-center w-full h-screen bg-gradient-to-br from-neutral-900 to-neutral-700"
      >
        Loading product...
      </div>
    );

  if (!product) return <div>Product not found</div>;

  return (
    <div className={"flex flex-col w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-700"}>
      <ProductDetails product={product} />
      <Reviews product={product} />
      <SimilarItems product={product} />
    </div>
  );
}

