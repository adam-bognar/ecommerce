import { Accordion } from "../Accordion/Accordion";


type Props = {
  showMobileSortOptions: boolean;
}

export function MobileFilters(
    { showMobileSortOptions}: Props
){
    return (
        <div className={`fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex lg:hidden items-end transition-opacity duration-300 ${showMobileSortOptions ? "opacity-100" : "opacity-0"}`}>
          <div className={`bg-white w-full rounded-t-xl p-5 transition-transform duration-300 ease-out transform ${showMobileSortOptions ? "translate-y-0" : "translate-y-full"}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Rendezés</h3>
              <button onClick={() =>{} }>
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className={"flex flex-col gap-2"}>
            <Accordion value="item-1" title="Rendezés">
              <div className="flex flex-col gap-2 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mobileSortOption"
                     checked={false}
                    onChange={() =>{} }
                  />
                  Népszerű
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mobileSortOption"
                    //checked={sortBy === "price-asc"}
                    //onChange={() => handleMobileSortOptionClick("price-asc")}
                  />
                  Ár szerint növekvő
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mobileSortOption"
                    //checked={sortBy === "price-desc"}
                    //onChange={() => handleMobileSortOptionClick("price-desc")}
                  />
                  Ár szerint csökkenő
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mobileSortOption"
                   // checked={sortBy === "name-asc"}
                    //onChange={() => handleMobileSortOptionClick("name-asc")}
                  />
                  Név szerint A-Z
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mobileSortOption"
                    //checked={sortBy === "name-desc"}
                    //onChange={() => handleMobileSortOptionClick("name-desc")}
                  />
                  Név szerint Z-A
                </label>
              </div>
            </Accordion>
            {/* <Filters
             filters={filters}
              handleCategoryChange={handleCategoryChange} 
              handleMaxPriceChange={handleMaxPriceChange} 
              handleMinPriceChange={handleMinPriceChange}
               handlePriceChange={handlePriceChange}
               className="flex flex-col w-full"
               /> */}

            </div>
          </div>
        </div>
    )
}