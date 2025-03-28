
import { motion } from 'framer-motion';
import { CheckCircle, PhoneCall, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainNavbar from '@/components/MainNavbar';
import Footer from '@/components/email-landing/Footer';

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background font-tajawal flex flex-col" dir="rtl">
      <MainNavbar />
      
      <div className="flex-grow flex items-center justify-center p-4 pt-24">
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-bold mb-4 text-gray-800">شكراً لطلبك!</h1>
          <p className="text-xl mb-6 text-gray-600">
            تم استلام طلبك بنجاح وسيتم التواصل معك قريباً
          </p>
          
          <div className="bg-green-50 p-6 rounded-lg mb-8 text-right">
            <h2 className="text-xl font-bold mb-4 text-gray-800">ماذا سيحدث الآن؟</h2>
            
            <div className="flex items-start mb-4">
              <div className="bg-green-200 p-2 rounded-full ml-3 mt-1">
                <PhoneCall className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">سيتصل بك أحد موظفينا</h3>
                <p className="text-gray-600">سيقوم أحد ممثلي خدمة العملاء بالاتصال بك في أقرب وقت ممكن لتأكيد طلبك وتفاصيل التوصيل</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-200 p-2 rounded-full ml-3 mt-1">
                <Home className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">توصيل سريع</h3>
                <p className="text-gray-600">سيتم توصيل منتجك خلال 3-5 أيام عمل من تاريخ تأكيد الطلب</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button asChild className="bg-green-600 hover:bg-green-700 w-full py-6 text-lg">
              <Link to="/trim-master">العودة إلى الصفحة الرئيسية</Link>
            </Button>
            
            <p className="text-sm text-gray-500">
              إذا كان لديك أي استفسار، يرجى التواصل معنا على البريد الإلكتروني: ediaybimohammed@gmail.com
            </p>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
