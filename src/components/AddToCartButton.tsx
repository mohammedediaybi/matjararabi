
import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/utils/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  productId: string;
  color?: string;
  option?: string;
  className?: string;
}

export default function AddToCartButton({ productId, color, option, className }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate network delay
    setTimeout(() => {
      addItem(productId, 1, color, option);
      setIsAdding(false);
      setIsAdded(true);
      
      // Reset button after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 500);
  };
  
  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || isAdded}
      className={cn(
        "relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300",
        isAdded 
          ? "bg-green-500 text-white" 
          : "bg-primary text-white hover:bg-primary/90",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {isAdding && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </motion.div>
        )}
        
        {!isAdding && isAdded && (
          <motion.div
            key="added"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex items-center justify-center space-x-2 space-x-reverse"
          >
            <Check className="w-5 h-5" />
            <span>تمت الإضافة</span>
          </motion.div>
        )}
        
        {!isAdding && !isAdded && (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center space-x-2 space-x-reverse"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>أضف إلى السلة</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
