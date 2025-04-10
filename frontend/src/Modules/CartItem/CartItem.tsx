import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/Models";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "preact/hooks";
import { deleteItem, updateQuantity as updateCartQuantity } from "@/api";
import { setItems } from "@/services/itemsInLocalStorage";


type Props = {
    product: Product,
    quantity: number,
  };
  
  export function CartItem({ product, quantity}: Props) {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
  
    const decreaseQuantity = () => {
      if (currentQuantity > 1) {
        updateQuantity(product.id, -1);
        setCurrentQuantity((prev) => prev - 1);
        setItems(-1);
        // Optional: Dispatch the custom event
        window.dispatchEvent(new Event('cartUpdated'));
      }
    };
  
    const increaseQuantity = () => {
      updateQuantity(product.id, 1);
        setCurrentQuantity((prev) => prev + 1);
        setItems(1);
    };

    const updateQuantity = async (productId: number, quantity: number) => {
      try{
        await updateCartQuantity(productId, quantity);

      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    };

    const handleDelete = async () => {
      try {
        await deleteItem(product.id);
        setItems(-currentQuantity);
      }
      catch (error) {
        console.error("Error removing item:", error);
      }
    }
  
    return (
      <Card className="bg-neutral-800 border-neutral-700 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="pl-4 sm:w-40 flex-shrink-0 aspect-[4/3] h-50">
              <img 
                src={product.imageUrl}
                alt="Product image"
                className="rounded-3xl  "

                 />
            </div>
            <div className="p-6 flex-1">
              <div className="flex flex-col h-full">
                <div>
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-neutral-400 text-sm mt-1">{product.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:cursor-pointer" onClick={decreaseQuantity}>
                      <MinusIcon className="h-3 w-3" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span className="w-8 text-center text-sm">{currentQuantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:cursor-pointer" onClick={increaseQuantity}>
                      <PlusIcon className="h-3 w-3" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-8 hover:cursor-pointer" 
                        onClick={() => {
                            handleDelete();
                          }
                        }
                        >
                      <Trash2 className="h-4 w-4 text-red-600" />
                      Törlés
                    </Button>
                    <span className="font-medium">{product.price} Ft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
