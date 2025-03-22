
import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductHeaderProps {
  product: Product;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <motion.div 
      className="md:w-1/2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="inline-block bg-green-600 text-white text-sm px-3 py-1 rounded-full mb-3">
          منتج جديد
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
          ماكينة حلاقة اللحية بتقنية الشفط المتطورة
        </h1>
        <p className="text-xl mb-6 text-gray-600">
          تقنية الشفط المزدوج لتجربة حلاقة نظيفة ومريحة
        </p>
        
        <div className="flex items-center mb-6">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
            ))}
          </div>
          <span className="font-bold">{product.reviews}+ تقييم</span>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center mb-3">
            <CheckCircle className="text-green-600 w-5 h-5 ml-2" />
            <span>تصميم محرك مزدوج لشفط الشعر بكفاءة عالية</span>
          </div>
          <div className="flex items-center mb-3">
            <CheckCircle className="text-green-600 w-5 h-5 ml-2" />
            <span>عجلة دقيقة مع 20 إعداد للطول (1-20 مم)</span>
          </div>
          <div className="flex items-center mb-3">
            <CheckCircle className="text-green-600 w-5 h-5 ml-2" />
            <span>مقاومة للماء IPX6 للاستخدام أثناء الاستحمام</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="text-green-600 w-5 h-5 ml-2" />
            <span>بطارية قوية تدوم لمدة 90 دقيقة مع شحن USB-C</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="text-2xl line-through text-gray-400 ml-3">{product.price} ر.س</span>
          <span className="text-3xl font-bold text-green-600">{product.discountPrice} ر.س</span>
          <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full mr-3">
            خصم {Math.round(((product.price - (product.discountPrice || 0)) / product.price) * 100)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
