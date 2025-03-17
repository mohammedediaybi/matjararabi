
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash, Minus, Plus } from 'lucide-react';
import { useCartStore, CartItem as CartItemType } from '@/utils/cartStore';
import { getProductById } from '@/data/products';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  
  const product = getProductById(item.productId);
  
  if (!product) return null;
  
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeItem(item.id);
    }, 300);
  };
  
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const price = product.discountPrice || product.price;
  const total = price * item.quantity;
  
  return (
    <motion.div 
      className={cn(
        "flex py-4 border-b transition-all duration-300",
        isRemoving && "opacity-0 translate-x-10"
      )}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border">
        <img
          src={product.images[0]}
          alt={product.arabicTitle}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex flex-1 flex-col mr-5">
        <div className="flex justify-between">
          <Link 
            to={`/product/${product.id}`}
            className="text-base font-medium text-gray-800 hover:text-primary transition-colors"
          >
            {product.arabicTitle}
          </Link>
          
          <button 
            onClick={handleRemove} 
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash size={18} />
          </button>
        </div>
        
        <div className="mt-1 text-sm text-muted-foreground">
          {item.color && (
            <p>
              اللون: <span className="text-foreground">{
                product.options?.find(o => o.name === "Color")
                  ?.arabicValues[
                    product.options?.find(o => o.name === "Color")
                      ?.values.findIndex(v => v === item.color) || 0
                  ] || item.color
              }</span>
            </p>
          )}
          {item.option && <p>الخيار: <span className="text-foreground">{item.option}</span></p>}
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button 
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center text-sm">{item.quantity}</span>
            <button 
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div>
            <span className="font-medium text-primary">{total} ر.س</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
