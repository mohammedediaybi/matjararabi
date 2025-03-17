
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;
  
  return (
    <motion.div 
      className="group relative bg-white rounded-2xl shadow-sm border border-border overflow-hidden transition-all duration-300 hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {discount > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
            {discount}% خصم
          </span>
        </div>
      )}
      
      <button className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200">
        <Heart size={16} />
      </button>
      
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <div className={cn(
            "absolute inset-0 transition-all duration-500 ease-out",
            !isLoaded && "image-loading"
          )}>
            <img
              src={product.images[0]}
              alt={product.arabicTitle}
              onLoad={() => setIsLoaded(true)}
              className={cn(
                "w-full h-full object-cover transition-all duration-500",
                isHovered ? "scale-110" : "scale-100"
              )}
            />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-base line-clamp-1">{product.arabicTitle}</h3>
          
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
            <span className="mx-2 text-muted-foreground text-xs">|</span>
            <span className="text-xs text-muted-foreground">{product.reviews} تقييم</span>
          </div>
          
          <div className="mt-3 flex items-baseline gap-2">
            {product.discountPrice && (
              <>
                <span className="text-lg font-bold text-primary">{product.discountPrice} ر.س</span>
                <span className="text-sm text-muted-foreground line-through">{product.price} ر.س</span>
              </>
            )}
            {!product.discountPrice && (
              <span className="text-lg font-bold text-primary">{product.price} ر.س</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
