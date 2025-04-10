import { X } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import { Product } from "../../Models";
import { getAllProducts } from "../../api";
import { useModal } from "../../services/useModal";
import MobileShoppingList from "../MobileShoppingItem/MobileShoppingList";

type Props = {
    isOpen: boolean,
    setIsOpen: () => void,
};

export function SearchOverlay({ isOpen, setIsOpen }: Props) {

    const modalRef = useModal(isOpen, setIsOpen);
    const [getProducts, setProducts] = useState<Product[]>([])
	const [search, setSearch] = useState("");

	const handleSearch = (e: any) => {
		setSearch(e.target.value)
	}
    

    useEffect(() => {
        const getProductsFromApi = async () => {
          const response = await getAllProducts(
            { search: search }
          );
          if (typeof response !== "string") {
            setProducts(response);
          } else {
            console.error("Error fetching products:", response);
          }
        };
        getProductsFromApi();
      }, [search]);
     



    return (
        <div
            ref={modalRef}
            className={`fixed z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto max-h-screen
                ${isOpen ? "translate-y-0 sm:translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full"}
                bottom-0 sm:top-0 sm:bottom-0 sm:right-0
                w-full sm:w-[500px]
                h-[85%] sm:h-full
                rounded-t-4xl sm:rounded-t-none
                bg-gradient-to-br from-neutral-900 to-neutral-800`}
        >
            <div className={"flex flex-col items-center justify-center w-full px-4 py-4"}>
                <div className={"flex flex-row w-full justify-between items-center"}>
                    <h1 className={"text-2xl font-medium text-white"}>Keresés</h1>
                    <button
                        onClick={setIsOpen}
                        className="border border-gray-300 rounded-lg p-3 hover:bg-neutral-700 active:bg-gray-150 cursor-pointer">
                        <X className="h-4 w-4 text-white" />
                    </button>
                </div>
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Keresés..."
                    className="border text-white border-gray-300 rounded-lg p-3 w-full mt-4" />
                <MobileShoppingList products={getProducts} setIsOpen={setIsOpen} />
            </div>
        </div>
    );
}