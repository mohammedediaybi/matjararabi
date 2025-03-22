
import { getProductById } from '@/data/products';
import Header from '@/components/email-landing/Header';
import ProductHeader from '@/components/email-landing/ProductHeader';
import ProductDetails from '@/components/email-landing/ProductDetails';
import OrderForm from '@/components/email-landing/OrderForm';
import Testimonials from '@/components/email-landing/Testimonials';
import CallToAction from '@/components/email-landing/CallToAction';
import Footer from '@/components/email-landing/Footer';
import ImageGallery from '@/components/ImageGallery';
import { motion } from 'framer-motion';

export default function EmailLanding() {
  const product = getProductById("5"); // ID for WAIKIL trimmer
  
  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">المنتج غير متوفر</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background font-tajawal" dir="rtl">
      {/* Header */}
      <Header product={product} />
      
      {/* Hero Section */}
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ProductHeader product={product} />
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ImageGallery images={product.images} productName={product.arabicTitle} />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <ProductDetails product={product} />
      
      {/* Order Form Section */}
      <OrderForm product={product} />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Call to Action Section */}
      <CallToAction product={product} />
      
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
