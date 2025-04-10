import { getAllProducts } from "@/api";
import { Product } from "@/Models";
import { useEffect, useState } from "preact/hooks";
import Featured from "../../Modules/Featured/Featured";
import Hero from "../../Modules/Hero/Hero";

type Props = {
}

export default function Home({}: Props) {

  const [products, setProducts] = useState<Product[]>([]);



  useEffect(() => {
      const getProductsFromApi = async () => {
        const response = await getAllProducts();
        if (typeof response !== "string") {
          setProducts(response);
        } else {
          console.error("Error fetching products:", response);
        }
        
      };
      getProductsFromApi();
    }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <Featured title="Kiemelt" products={products}/>
      </main>
    </div>
  );
}

