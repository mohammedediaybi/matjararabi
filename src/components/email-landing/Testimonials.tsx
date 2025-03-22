
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "محمد علي",
      text: "أفضل ماكينة حلاقة استخدمتها، نظام الشفط رائع ويحافظ على نظافة المكان أثناء الحلاقة. البطارية تدوم طويلاً!",
      rating: 5
    },
    {
      name: "أحمد خالد",
      text: "جودة ممتازة وسهلة الاستخدام. الشحن سريع والتسليم كان في الوقت المحدد. أنصح بها بشدة لمن يبحث عن تجربة حلاقة احترافية.",
      rating: 5
    },
    {
      name: "عمر السيد",
      text: "العجلة الدقيقة للضبط ممتازة لضبط طول الشعر بالمللمتر. المنتج يستحق كل ريال. ميزة مقاومة الماء مفيدة جداً.",
      rating: 4
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">ماذا يقول عملاؤنا</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-green-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} 
                  />
                ))}
              </div>
              <p className="mb-4 text-gray-700">{testimonial.text}</p>
              <p className="font-bold text-gray-800">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
