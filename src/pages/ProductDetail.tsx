
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Check, Share, Heart, ShoppingCart } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useCartStore } from '@/utils/cartStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import AddToCartButton from '@/components/AddToCartButton';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const addItem = useCartStore(state => state.addItem);
  
  const product = id ? getProductById(id) : undefined;
  
  // Related products (in a real app, these would be fetched based on the current product)
  const relatedProducts = product ? 
    [...Array(3)].map((_, index) => getProductById(String((parseInt(product.id) + index + 1) % 3 + 1))) 
    .filter(Boolean) : [];
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set default selected color if colors are available
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    
    // Set default selected option if options are available
    if (product?.options && product.options.length > 0 && product.options[0].values.length > 0) {
      setSelectedOption(product.options[0].values[0]);
    }
  }, [product]);
  
  if (!product) {
    // Product not found
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
            <p className="text-muted-foreground mb-6">عذراً، لم نتمكن من العثور على المنتج الذي تبحث عنه.</p>
            <Link 
              to="/shop"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg"
            >
              <ArrowRight className="ml-2 w-4 h-4" />
              العودة إلى المتجر
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addItem(product.id, quantity, selectedColor, selectedOption);
    toast.success('تمت الإضافة إلى العربة', { duration: 2000 });
  };
  
  const handleBuyNow = () => {
    addItem(product.id, quantity, selectedColor, selectedOption);
    navigate('/cart');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Breadcrumbs */}
      <div className="bg-accent/30 pt-28 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-primary transition-colors">المتجر</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.arabicTitle}</span>
          </div>
        </div>
      </div>
      
      {/* Product Detail */}
      <section className="py-8 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Images */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ImageGallery images={product.images} productName={product.arabicTitle} />
            </motion.div>
            
            {/* Product Info */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.arabicTitle}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={cn(
                        "w-4 h-4", 
                        i < Math.round(product.rating) 
                          ? "fill-amber-400 text-amber-400" 
                          : "fill-gray-200 text-gray-200"
                      )}
                    />
                  ))}
                  <span className="text-sm ml-2">{product.rating}</span>
                </div>
                <span className="mx-2 text-muted-foreground">|</span>
                <span className="text-sm text-muted-foreground">{product.reviews} تقييم</span>
              </div>
              
              <div className="mb-6">
                {product.discountPrice ? (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-primary">{product.discountPrice} ر.س</span>
                    <span className="text-lg text-muted-foreground line-through mr-2">{product.price} ر.س</span>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mr-2">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% خصم
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary">{product.price} ر.س</span>
                )}
              </div>
              
              <p className="text-muted-foreground mb-6">{product.arabicDescription}</p>
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">اللون</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                          selectedColor === color 
                            ? "border-primary" 
                            : "border-transparent hover:border-muted"
                        )}
                        title={product.options?.find(o => o.name === "Color")?.arabicValues[index]}
                      >
                        <span 
                          className="w-8 h-8 rounded-full" 
                          style={{ backgroundColor: color }} 
                        />
                        {selectedColor === color && (
                          <Check className="absolute w-4 h-4 text-white drop-shadow-md" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity Selection */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">الكمية</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center border rounded-r-lg text-lg"
                  >
                    -
                  </button>
                  <div className="w-14 h-10 flex items-center justify-center border-t border-b">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center border rounded-l-lg text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart and Buy Now Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <AddToCartButton 
                  productId={product.id} 
                  color={selectedColor} 
                  option={selectedOption}
                  className="flex-1"
                />
                
                <button
                  onClick={handleBuyNow}
                  className="flex-1 rounded-lg px-6 py-3 font-medium bg-accent text-foreground hover:bg-accent/80 transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>شراء الآن</span>
                </button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-6">
                <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="w-5 h-5 ml-1" />
                  <span>إضافة للمفضلة</span>
                </button>
                <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Share className="w-5 h-5 ml-1" />
                  <span>مشاركة</span>
                </button>
              </div>
              
              {/* Shipping Info */}
              <div className="bg-accent/40 p-4 rounded-lg">
                <p className="text-sm flex items-center">
                  <Truck className="w-4 h-4 ml-2 text-primary" />
                  <span>شحن مجاني للطلبات فوق 200 ر.س</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      <section className="py-16 px-4 md:px-0 bg-accent/20">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-display font-bold">منتجات مشابهة</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
