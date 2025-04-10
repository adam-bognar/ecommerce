import { useModal } from "../../services/useModal";
import { SortOption } from "../ReadyProducts/ReadyProducts";

type Prop = {
    sortBy: SortOption;
    setSortBy: (value: SortOption) => void;
    setShowSortOptions: (value: boolean) => void;
    showSortOptions: boolean;
    setSortLabel: (value: string) => void;
}

export function SortModal({sortBy, setSortBy, setShowSortOptions, showSortOptions, setSortLabel}: Prop) {

    const modalRef = useModal(showSortOptions, setShowSortOptions);


    return <div ref={modalRef} className="absolute left-0 w-52 bg-white border rounded-md shadow-lg mt-3 p-3 z-50">
    <div className="py-1 space-y-2">
      {[
        { label: "Népszerű", value: "popular" },
        { label: "Ár szerint növekvő", value: "priceAsc" },
        { label: "Ár szerint csökkenő", value: "priceDesc" },
        { label: "Név szerint A-Z", value: "nameAsc" },
        { label: "Név szerint Z-A", value: "nameDesc" },
      ].map(({ label, value }) => (
        <button
          key={value}
          className={`group relative block px-3 py-2 text-left w-full hover:cursor-pointer rounded-md ${sortBy === value ? "font-bold" : ""}`}
          onClick={() => {
            setSortBy(value as SortOption);
            setSortLabel(label);
            setShowSortOptions(false);
          } }
        >
          <span className="relative inline-block">
            {label}
            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>
      ))}
    </div>
  </div>;
}