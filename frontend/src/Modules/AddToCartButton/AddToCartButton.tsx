import { addToCart } from "@/api";
import { setItems } from "@/services/itemsInLocalStorage";

type Props = {
  id: number;
};

const AddToCartButton = ({id}: Props) => {

  const handleClick = async() => {
    try {
      await addToCart(id);
    }catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
  

  return (
    <button
      className="font-medium text-sm border text-white border-gray-200 rounded-md h-9 px-3 cursor-pointer hover:bg-neutral-700"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        handleClick();
        setItems(1);
        console.log("Added to cart");
      }}
    >
      Kosárba
    </button>
  );
};

export default AddToCartButton;

