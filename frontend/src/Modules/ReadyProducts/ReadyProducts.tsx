import { ChevronDown } from "lucide-react";
import { useState } from "preact/hooks";
import { Product } from "../../Models";
import { MobileFilters } from "../MobileFilters/MobileFilters";
import ShoppingItem from "../ShoppingItem/ShoppingItem";
import { SortModal } from "../SortModal/SortModal";

type Props = {
  products: Product[],
  handleSort: (value: string) => void
  sort: SortOption;
  filters: {
    category: string;
    difficulty: string[];
    minPrice: number;
    maxPrice: number;},
    methods: {
      handleCategoryChange: (category: string) => void,
      handleMaxPriceChange: (event: Event) => void,
      handleMinPriceChange: (event: Event) => void,
      handlePriceChange: () => void,
      handleDifficultyChange: (selectedDifficulty: string) => void
    },


}

export type SortOption = "popular" | "priceAsc" | "priceDesc" | "nameAsc" | "nameDesc";

const ReadyProducts = ({ products, handleSort ,sort, filters, methods}: Props) => {

  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showMobileSortOptions, setShowMobileSortOptions] = useState(false);
  const [sortLabel, setSortLabel] = useState("Népszerű");

  

  const handleMobileSortOptionClick = (option: SortOption) => {
    handleSort(option);
  };


  return (
    <div className="flex flex-col my-5 md:my-10 mx-2 md:mx-5">

      <div className={"flex flex-row items-center gap-4 justify-between"}>
        <h1 className="flex text-3xl font-bold mb-4 text-white">Minden termék</h1>
        <div className="relative z-40">
          <button
            className="hidden group relative lg:flex flex-row items-center justify-center gap-2 hover:cursor-pointer "
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            <span className="font-bold text-lg text-white">Rendezés: </span>
            <span className="text-md font- text-white">{sortLabel}</span>
            <ChevronDown
              className={`h-6 w-6 shrink-0 p-1 bg-white rounded-3xl transition-transform duration-200 ${showSortOptions ? "rotate-180" : ""}`}
            />
            <span className="absolute left-0 bottom-[-3px] w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </button>

          {showSortOptions && (
            <SortModal sortBy={sort} setSortBy={handleSort} setSortLabel={setSortLabel} setShowSortOptions={setShowSortOptions} showSortOptions={showSortOptions} />
          )}
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {
        products.map((product) => 
        <ShoppingItem product={product} 
        />
      )
        
        }
      </div>

      {/* <button
        className="fixed bottom-6 right-6 z-50 flex lg:hidden items-center justify-center bg-black text-white p-4 rounded-full shadow-lg"
        onClick={() => setShowMobileSortOptions(!showMobileSortOptions)}
      >
        <SlidersHorizontal size={24} />
      </button> */}

      {showMobileSortOptions && (
        <MobileFilters 
          showMobileSortOptions={showMobileSortOptions}


         />
        
      )}

    </div>


  );
};

export default ReadyProducts;
