import { Search, ShoppingCart, User } from 'lucide-react'
import { useState, useEffect } from 'preact/hooks'
import { Link } from 'wouter'
import { getMyCart } from '@/api'
import { getItems } from '@/services/itemsInLocalStorage'

type Props = {
  setSearchOpen: () => void
}

const ActionButtons = ({setSearchOpen}: Props) => {
  const [itemsInCart, setItemsInCart] = useState(0);
  
  // Track localStorage changes
  useEffect(() => {
    // Initial load
    setItemsInCart(getItems());
    
    // Function to handle storage changes
    const handleStorageChange = () => {
      setItemsInCart(getItems());
    };
    
    // Listen for storage events (when localStorage changes in other tabs)
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('cartUpdated', handleStorageChange);
    
    // Check periodically (as a fallback)
    const interval = setInterval(() => {
      setItemsInCart(getItems());
    }, 2000);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex gap-3">
      <button
        onClick={setSearchOpen}
        className="border border-gray-300 rounded-lg p-3 hover:bg-neutral-700 
                  active:bg-gray-150 cursor-pointer ml-2"
      >
        <Search className="h-4 w-4 text-white" />
      </button>
    
      <Link href="/ecommerce/cart" className="border border-gray-300 rounded-lg p-3 hover:bg-neutral-700 active:bg-gray-150 cursor-pointer relative">
        <ShoppingCart className="h-4 w-4 text-white" />
        {itemsInCart > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-300 text-black text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
            {itemsInCart > 99 ? '99+' : itemsInCart}
          </span>
        )}
      </Link>
      
      <div className="hidden md:flex items-center">
        <Link href="/ecommerce/account/settings" className="border border-gray-300 rounded-lg p-3 hover:bg-neutral-700 active:bg-gray-150 cursor-pointer">
          <User className="h-4 w-4 text-white" />
        </Link>
      </div>
    </div>
  )
}

export default ActionButtons