
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, CreditCard, Truck } from 'lucide-react';
import { useCartStore } from '@/utils/cartStore';
import { getProductById } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';

export default function Cart() {
  const items = useCartStore(state => state.items);
  const clearCart = useCartStore(state => state.clearCart);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Calculate cart total
  useEffect(() => {
    const total = items.reduce((sum, item) => {
      const product = getProductById(item.productId);
      if (!product) return sum;
      const price = product.discountPrice || product.price;
      return sum + (price * item.quantity);
    }, 0);
    
    setCartTotal(total);
  }, [items]);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      // In a real app, you would redirect to a checkout page or show a success message
      setIsCheckingOut(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-28 pb-10 px-4 md:px-0 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center">
            <motion.h1 
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              عربة التسوق
            </motion.h1>
            <motion.div 
              className="flex items-center justify-center text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">عربة التسوق</span>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Cart Content */}
      <section className="py-10 px-4 md:px-0 flex-grow">
        <div className="container mx-auto">
          {items.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <motion.div 
                className="lg:w-8/12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">المنتجات ({items.length})</h2>
                  </div>
                  
                  <div className="divide-y">
                    {items.map(item => (
                      <div key={item.id} className="p-6">
                        <CartItem item={item} />
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 border-t bg-accent/10 flex justify-between">
                    <Link 
                      to="/shop"
                      className="flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      <ArrowRight className="ml-2 w-4 h-4" />
                      <span>متابعة التسوق</span>
                    </Link>
                    
                    <button 
                      onClick={clearCart}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      مسح العربة
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Order Summary */}
              <motion.div 
                className="lg:w-4/12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">ملخص الطلب</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المجموع الفرعي</span>
                      <span>{cartTotal} ر.س</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الشحن</span>
                      <span className="text-green-600">مجاني</span>
                    </div>
                    
                    <div className="pt-4 border-t flex justify-between font-bold">
                      <span>المجموع</span>
                      <span className="text-primary">{cartTotal} ر.س</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-accent/10 space-y-4">
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center relative overflow-hidden"
                    >
                      {isCheckingOut ? (
                        <>
                          <span className="opacity-0">إتمام الطلب</span>
                          <svg className="w-5 h-5 animate-spin absolute" viewBox="0 0 24 24">
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
                        </>
                      ) : (
                        <>
                          <CreditCard className="ml-2 w-5 h-5" />
                          <span>إتمام الطلب</span>
                        </>
                      )}
                    </button>
                    
                    <div className="text-center text-xs text-muted-foreground">
                      تأكيد الطلب يعني موافقتك على <Link to="/terms" className="text-primary">الشروط والأحكام</Link>
                    </div>
                  </div>
                  
                  <div className="p-6 border-t">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Truck className="w-4 h-4 ml-2 text-primary" />
                      <span>شحن مجاني للطلبات فوق 200 ر.س</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CreditCard className="w-4 h-4 ml-2 text-primary" />
                      <span>دفع آمن 100%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 mx-auto bg-accent rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">عربة التسوق فارغة</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                لم تقم بإضافة أي منتجات إلى عربة التسوق بعد. تصفح المتجر واكتشف منتجاتنا الرائعة.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <ArrowRight className="ml-2 w-5 h-5" />
                <span>تصفح المتجر</span>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
