import { Accordion } from "../Accordion/Accordion";

type Props = {
    filters: {
        category: string,
        difficulty: string[],
        minPrice: number,
        maxPrice: number
    },
    methods: {
        handleDifficultyChange: (selectedDifficulty: string) => void,
        handleCategoryChange: (category: string) => void,
        handleMaxPriceChange: (event: Event) => void,
        handleMinPriceChange: (event: Event) => void,
        handlePriceChange: () => void
    },
    className?: string
};


export function Filters({ className, filters, methods}: Props) {

    return (
        <div className={className || "hidden lg:flex flex-col w-[300px] my-20"}>

           

            {/* Difficulty Filter */}
            <Accordion value="item-2" title="Nehézség">
                <div className="flex flex-col gap-2 text-sm text-gray-700">
                    <label className="flex items-center gap-2 text-white">
                        <input
                            type="checkbox"
                            checked={filters.difficulty.includes("Easy")}
                            onChange={() => methods.handleDifficultyChange("Easy")}
                        />

                        Easy
                    </label>
                    <label className="flex items-center gap-2 text-white">
                        <input
                            type="checkbox"
                            checked={filters.difficulty.includes("Medium")}
                            onChange={() => methods.handleDifficultyChange("Medium")}
                        />
                        Medium
                    </label>
                    <label className="flex items-center gap-2 text-white">
                        <input
                            className={"text-white border border-white"}
                            type="checkbox"
                            checked={filters.difficulty.includes("Hard")}
                            onChange={() => methods.handleDifficultyChange("Hard")}
                        />
                        Hard
                    </label>
                </div>
            </Accordion>

            {/* Price Range Filter */}
            <Accordion value="item-3" title="Ár">
                <div class={"flex flex-col items-center gap-3"}>
                    <div className="flex flex-row gap-2 text-sm text-gray-700 items-center w-full">
                        <input
                            type="number"
                            placeholder="Min"
                            onChange={methods.handleMinPriceChange}
                            className="flex-1 border border-black p-2 bg-white rounded-lg w-full focus:outline-none  "
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            onChange={methods.handleMaxPriceChange}
                            className="flex-1 border border-black p-2 bg-white rounded-lg w-full focus:outline-none  "
                        />
                    </div>
                    <button
                        class={"w-full border border-gray-400 bg-white rounded-md p-1 hover:cursor-pointer hover:bg-gray-50"}
                        onClick={methods.handlePriceChange}
                    >Szűrés</button>
                </div>

            </Accordion>


        </div>
    )
}