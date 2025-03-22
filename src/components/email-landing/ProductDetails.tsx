
import { motion } from 'framer-motion';
import { CheckCircle, Info } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">تفاصيل المنتج</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
              <Info className="w-5 h-5 ml-2 text-green-600" />
              المواصفات التقنية
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs ml-2 mt-0.5">1</span>
                <span><strong>المحرك:</strong> محرك مزدوج بتقنية الشفط المتطورة</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs ml-2 mt-0.5">2</span>
                <span><strong>البطارية:</strong> 1400 مللي أمبير، تدوم لمدة 90 دقيقة</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs ml-2 mt-0.5">3</span>
                <span><strong>مدة الشحن:</strong> ساعتان فقط عبر USB-C</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs ml-2 mt-0.5">4</span>
                <span><strong>إعدادات الطول:</strong> 20 إعداد (1-20 مم) عبر عجلة دقيقة</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs ml-2 mt-0.5">5</span>
                <span><strong>مقاومة الماء:</strong> IPX6 (يمكن غسله بالماء الجاري)</span>
              </li>
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {product.images.slice(4, 8).map((image, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <img 
                  src={image} 
                  alt={`ميزة ${index + 1}`} 
                  className="w-full h-48 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <h3 className="text-xl font-bold mb-4 text-gray-800">محتويات العلبة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
              <CheckCircle className="text-green-600 w-5 h-5 ml-3 flex-shrink-0" />
              <span>ماكينة حلاقة وايكيل الأساسية</span>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
              <CheckCircle className="text-green-600 w-5 h-5 ml-3 flex-shrink-0" />
              <span>مجموعة أمشاط قابلة للتعديل</span>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
              <CheckCircle className="text-green-600 w-5 h-5 ml-3 flex-shrink-0" />
              <span>فرشاة تنظيف مخصصة</span>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
              <CheckCircle className="text-green-600 w-5 h-5 ml-3 flex-shrink-0" />
              <span>كابل شحن USB-C عالي الجودة</span>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
              <CheckCircle className="text-green-600 w-5 h-5 ml-3 flex-shrink-0" />
              <span>زيت تشحيم للشفرات</span>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
              <CheckCircle className="text-green-600 w-5 h-5 ml-3 flex-shrink-0" />
              <span>دليل المستخدم باللغة العربية</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={product.images[2]} 
              alt="استخدام المنتج" 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </motion.div>
          <div className="md:w-1/2 bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">مميزات فريدة</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="text-green-600 w-5 h-5 ml-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold">نظام شفط متطور</p>
                  <p className="text-gray-600">يجمع الشفاط المدمج 99% من الشعر أثناء الحلاقة، مما يجعل التنظيف بعد الحلاقة أمرًا سهلاً وسريعًا.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 w-5 h-5 ml-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold">تصميم مريح للاستخدام</p>
                  <p className="text-gray-600">مقبض مريح مصمم هندسيًا ليناسب راحة اليد، مما يتيح تحكمًا دقيقًا أثناء الحلاقة.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 w-5 h-5 ml-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold">شفرات من الفولاذ المقاوم للصدأ</p>
                  <p className="text-gray-600">شفرات حادة متينة تضمن حلاقة نظيفة دون سحب الشعر أو تهيج البشرة.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-600 w-5 h-5 ml-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold">مؤشر LED للبطارية</p>
                  <p className="text-gray-600">يعرض مستوى البطارية بدقة لتعرف متى تحتاج إلى إعادة شحن الجهاز.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
