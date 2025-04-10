import { addToCart } from "@/api";
import { setItems } from "@/services/itemsInLocalStorage";


type Props = {
  id: number;
};


const AddToCart = ({id}: Props) => {

const handleClick = async() => {
    try {
      await addToCart(id);
    }catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  return (
    <button className="w-full text-white font-bold text-lg  border border-gray-200 rounded-md h-12 px-3 cursor-pointer hover:bg-neutral-700"
    onClick={(event) => {
      event.preventDefault();
      event.stopPropagation();
      handleClick();
      setItems(1);
      console.log("Added to cart");
    }}
    >Kosárba</button>
  )
}

export default AddToCart