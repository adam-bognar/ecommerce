
import { useEffect, useState } from "preact/hooks";
import { Product } from "../../Models";
import { Filters } from "../../Modules/Filters/Filters";
import ReadyProducts, { SortOption } from "../../Modules/ReadyProducts/ReadyProducts";
import { getAllProducts } from "../../api";

type Props = {
};

const ProductsPage = ({ }: Props) => {

  const [getProducts, setProducts] = useState<Product[] | null>(null)
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sort, setSort] = useState<SortOption>("popular");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProductsFromApi = async () => {
      const response = await getAllProducts(
        { category: category, difficulty: difficulty, minPrice: minPrice, maxPrice: maxPrice, sort: sort.toString() }
      );
      if (typeof response !== "string") {
        setProducts(response);
      } else {
        console.error("Error fetching products:", response);
      }
      
    };
    getProductsFromApi();
  }, [category, difficulty, minPrice, maxPrice, sort]);

  const products = getProducts || [];

  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");


  const handleCategoryChange = (category: string) => {
    setCategory((prev) => {
      if (prev === category) {
        return null;
      } else {
        return category;
      }
    });
  };
  const handleMaxPriceChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setMaxPriceInput(target.value);
  }
  const handleMinPriceChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setMinPriceInput(target.value);
  }
  const handlePriceChange = () => {
    setMinPrice(Number(minPriceInput));
    setMaxPrice(Number(maxPriceInput));
  }
  const handleDifficultyChange = (selectedDifficulty: string) => {
    setDifficulty((prev) => {
      if (!prev) prev = []; // Ensure prev is always an array

      if (prev.includes(selectedDifficulty)) {
        // Remove difficulty if already selected
        const ize = prev.filter((d) => d !== selectedDifficulty)
        return ize;
      } else {
        // Add difficulty if not selected
        const ize = [...prev, selectedDifficulty]
        return ize;
      }
    });
  };

  const handleSort = (sort: SortOption) => {
    setSort(sort);
  }

  const filters = { category, difficulty, minPrice, maxPrice };

  const methods = { handleCategoryChange, handleDifficultyChange, handleMaxPriceChange, handleMinPriceChange, handlePriceChange };


  if (loading)
    return (
      <div
        className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-neutral-900 to-neutral-700 py-10"
      >
        Loading product...
        {setTimeout(() => {
          setLoading(false);
        }, 300)}
      </div>
    );

  return (
    <main className="flex flex-row justify-center w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-700 py-10">

      <Filters
        filters={filters}
        methods={methods}
      />

      <ReadyProducts products={products} handleSort={handleSort} sort={sort} filters={filters} methods={methods} />


    </main>
  );
};

export default ProductsPage;