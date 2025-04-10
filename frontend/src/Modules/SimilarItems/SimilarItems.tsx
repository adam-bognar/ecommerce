import { useEffect, useState } from "preact/hooks"
import { getSimilarProducts } from "../../api"
import { Product } from "../../Models"
import ShoppingItem from "../ShoppingItem/ShoppingItem"

type Props = {
  product: Product
}

export const SimilarItems = ({ product }: Props) => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getSimilarProducts(product.id.toString());
      if (typeof response !== "string") {
        setProducts(response.data);
      } else {
        console.error("Error fetching products:", response);
      }
    };
    loadProducts();
  }, [product.id]);



  return (
    <div className={"mx-5"}>
      <div className={"container mx-auto mb-10"}>
        <h1 className={"text-3xl text-white font-bold"}>Hasonló termékek</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-4">

          {products.map((product, index) => (
            <ShoppingItem product={product} />
          ))
}

          {/* <ShoppingItem product={product} />
          <ShoppingItem product={product} />
          <ShoppingItem product={product} />
          <ShoppingItem product={product} />
          <ShoppingItem product={product} />
          <ShoppingItem product={product} />
          <ShoppingItem product={product} />
          <ShoppingItem product={product} />
          <ShoppingItem product={product} /> */}
        </div>
      </div>
    </div>

  )
}