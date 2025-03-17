
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Gift, Truck, CreditCard, Star } from 'lucide-react';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export default function Index() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = products.slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 md:px-0 bg-gradient-to-b from-accent/50 to-background">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-right mb-10 lg:mb-0">
              <motion.span 
                className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                أفضل المنتجات الإلكترونية
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                تسوق أحدث <br />
                <span className="text-primary">الأجهزة الإلكترونية</span> <br />
                بأفضل الأسعار
              </motion.h1>
              
              <motion.p 
                className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                اكتشف مجموعة واسعة من المنتجات الإلكترونية عالية الجودة مع ضمان أصلي وتوصيل سريع إلى جميع أنحاء المملكة.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  to="/shop"
                  className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  تسوق الآن
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-3 bg-white border border-border rounded-lg font-medium hover:bg-accent transition-colors duration-200"
                >
                  اعرف المزيد
                </Link>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <div className="w-full h-full absolute -left-4 -top-4 bg-primary/10 rounded-3xl rotate-3" />
                <img 
                  src={products[0].images[0]}
                  alt="Featured Product"
                  className="w-full rounded-3xl relative shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl border border-border flex items-start space-x-4 space-x-reverse"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">توصيل مجاني</h3>
                <p className="text-muted-foreground text-sm">توصيل مجاني للطلبات فوق 200 ريال</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl border border-border flex items-start space-x-4 space-x-reverse"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">دفع آمن</h3>
                <p className="text-muted-foreground text-sm">خيارات دفع متعددة ومؤمنة 100%</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl border border-border flex items-start space-x-4 space-x-reverse"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">استبدال سهل</h3>
                <p className="text-muted-foreground text-sm">استبدال المنتجات خلال 14 يومًا</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl border border-border flex items-start space-x-4 space-x-reverse"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">منتجات أصلية</h3>
                <p className="text-muted-foreground text-sm">جميع منتجاتنا أصلية 100%</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              منتجات مميزة
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              اكتشف أحدث المنتجات الإلكترونية والأكثر مبيعًا بأفضل الأسعار
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors duration-200"
            >
              عرض جميع المنتجات
              <ShoppingBag className="mr-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
