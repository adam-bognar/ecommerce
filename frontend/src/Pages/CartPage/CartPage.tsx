import { createOrder, getMyCart, getProductByID } from "@/api";
import { CartDto, Product } from "@/Models";
import { CartItem } from "@/Modules/CartItem/CartItem";
import { OrderSummary } from "@/Modules/OrderSummary/OrderSummary";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "preact/hooks";

interface EnrichedCartItem {
  product: Product;
  quantity: number;
}

export function CartPage() {
  const [items, setItems] = useState<EnrichedCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalprice, setTotalPrice] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);

  useEffect(() => {
    const fetchCartWithProducts = async () => {
      const cartData = await getMyCart();

      if (typeof cartData === "string") {
        console.error("Error fetching cart:", cartData);
        setLoading(false);
        return;
      }
      setTotalPrice(cartData.totalPrice);

      const productPromises = cartData.cartItems.map(async (item) => {
        const product = await getProductByID(item.productId);
        return {
          product: typeof product === "string" ? null : product,
          quantity: item.quantity,
        };
      });

      const enrichedItems = (await Promise.all(productPromises)).filter(
        (item): item is EnrichedCartItem => item.product !== null
      );

      setItems(enrichedItems);
      setLoading(false);
    };

    fetchCartWithProducts();
  }, [items]);

  

const numberOfItemsInCart = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="container px-4 py-12 mx-auto max-w-6xl">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold">Kosár</h1>
          <div className="ml-auto flex items-center text-sm text-neutral-400">
            <ShoppingCart className="h-4 w-4 mr-1" />
            <span>{numberOfItemsInCart} termék</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {loading ? (
                <p>Loading cart...</p>
              ) : (
                items.map((item, i) => (
                  <CartItem
                   product={item.product}
                    quantity={item.quantity}
                     />
                ))
              )}
            </div>
          </div>
          <div>
            <OrderSummary
            totalPrice={totalprice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
