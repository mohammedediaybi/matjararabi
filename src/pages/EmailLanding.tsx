
import { useState } from 'react';
import { getProductById } from '@/data/products';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Star, Truck, ShoppingBag, Mail, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ImageGallery from '@/components/ImageGallery';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "يجب أن يحتوي الاسم على حرفين على الأقل",
  }),
  phone: z.string().min(8, {
    message: "يرجى إدخال رقم هاتف صحيح",
  }),
  city: z.string().min(2, {
    message: "يرجى إدخال اسم المدينة",
  }),
});

export default function EmailLanding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const product = getProductById("5"); // ID for WAIKIL trimmer
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Create email content for sending directly
      const orderData = {
        product: product?.arabicTitle,
        price: product?.discountPrice + " ر.س",
        customerName: values.name,
        customerPhone: values.phone,
        customerCity: values.city,
        orderDate: new Date().toISOString(),
      };
      
      // Send email directly using EmailJS or similar service
      // This is a direct HTTP POST request that will send the email
      // without requiring the user to open their email client
      const response = await fetch("https://formsubmit.co/ediaybimohammed@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          city: values.city,
          product: product?.arabicTitle,
          price: product?.discountPrice + " ر.س",
          _subject: "طلب جديد: ماكينة حلاقة وايكيل",
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      
      // Redirect to the thank you page
      navigate('/order-confirmation');
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">المنتج غير متوفر</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background font-tajawal" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-600 to-green-500 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/1c4c184a-b715-4876-9dfb-abb0d93dd8a8.png" 
              alt="WAIKIL Logo" 
              className="h-12 mr-2"
            />
            <span className="text-xl font-bold">WAIKIL</span>
          </div>
          <div className="border border-white/30 rounded-full py-1 px-4 text-sm">
            شحن مجاني لجميع الطلبات
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
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
      
      {/* Order Form Section */}
      <div className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">اطلب الآن واستفد من العرض الحصري</h2>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center mb-4">
                  <Truck className="w-6 h-6 text-green-600 ml-3" />
                  <div>
                    <h3 className="font-bold text-lg">الدفع عند الاستلام</h3>
                    <p className="text-gray-600">ادفع عند استلام المنتج مباشرة، لا حاجة للدفع المسبق</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <ShoppingBag className="w-6 h-6 text-green-600 ml-3" />
                  <div>
                    <h3 className="font-bold text-lg">شحن سريع لجميع المدن</h3>
                    <p className="text-gray-600">يصلك المنتج خلال 3-5 أيام عمل</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-green-600 ml-3" />
                  <div>
                    <h3 className="font-bold text-lg">تأكيد الطلب عبر الهاتف</h3>
                    <p className="text-gray-600">سيتصل بك أحد موظفينا في أقرب وقت لتأكيد طلبك</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <p className="text-amber-800 font-bold">عرض محدود: خصم {Math.round(((product.price - (product.discountPrice || 0)) / product.price) * 100)}% + شحن مجاني</p>
                <p className="text-amber-700">العرض ساري حتى نفاد الكمية!</p>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">اطلب الآن</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم الكامل</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسمك الكامل" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل رقم هاتفك" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المدينة</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسم مدينتك" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "جاري إرسال الطلب..." : "اطلب الآن"}
                      <ChevronRight className="w-5 h-5 mr-1" />
                    </Button>
                    
                    <p className="text-center text-sm text-gray-500">
                      بالضغط على "اطلب الآن" أنت توافق على سياسة الخصوصية وشروط الاستخدام
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">ماذا يقول عملاؤنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
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
            ].map((testimonial, index) => (
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
      
      {/* Call to Action Section */}
      <div className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">احصل على ماكينة حلاقة اللحية المتطورة الآن</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            لا تفوت فرصة الحصول على منتج عالي الجودة بسعر مخفض. اطلب الآن واستمتع بالدفع عند الاستلام.
          </p>
          <Button 
            className="text-lg py-6 px-8 bg-white text-green-600 hover:bg-green-50"
            onClick={() => {
              document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            اطلب الآن واحصل على خصم {Math.round(((product.price - (product.discountPrice || 0)) / product.price) * 100)}%
            <ChevronRight className="w-5 h-5 mr-1" />
          </Button>
        </div>
      </div>
      
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} WAIKIL - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
