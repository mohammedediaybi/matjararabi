
import { motion } from 'framer-motion';
import { Star, Check, Truck, Clock, Shield, RefreshCw, Battery, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

export default function TrimMasterLanding() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
    },
  });

  const images = [
    "public/lovable-uploads/e60d8b6c-4b2a-4854-84ee-793561c6a0a0.png",
    "/lovable-uploads/9e525e80-2957-428c-9260-66b6ea94ff3b.png",
    "/lovable-uploads/c3e2c443-79a3-46c4-aa49-6b0eef33fd8e.png",
    "/lovable-uploads/fdb33a93-2de7-47b3-aacd-125686543f15.png"
  ];
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Create email content for sending
      const orderData = {
        product: "تريم ماستر - ماكينة حلاقة بنظام الشفط",
        price: "299 ر.س",
        customerName: values.name,
        customerPhone: values.phone,
        customerCity: values.city,
        orderDate: new Date().toISOString(),
      };
      
      // Send email directly using FormSubmit service
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
          product: "تريم ماستر - ماكينة حلاقة بنظام الشفط",
          price: "299 ر.س",
          _subject: "طلب جديد: تريم ماستر",
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50 font-tajawal" dir="rtl">
      {/* Header Section */}
      <header className="bg-black text-white py-2 text-center text-sm">
        راضي أو استرجاع النقود خلال 30 يوم
      </header>
      
      {/* Navigation */}
      <nav className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">تريم ماستر</div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-center h-96">
                <img 
                  src={images[currentImage]} 
                  alt="تريم ماستر" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`border cursor-pointer rounded-md overflow-hidden ${currentImage === idx ? 'border-green-500' : 'border-gray-200'}`}
                    onClick={() => setCurrentImage(idx)}
                  >
                    <img src={img} alt={`صورة ${idx + 1}`} className="w-full h-20 object-cover" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2">
              <div className="text-xs text-gray-500 mb-2">+7500 عميل راضٍ على تريم ماستر</div>
              <h1 className="text-3xl font-bold mb-2">تريم ماستر | استمتع بحلاقة نظيفة، سريعة وسهلة.</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400 ml-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm">ممتاز 4.8 | </span>
                <span className="text-sm text-green-600 mr-1">✓ 700+ عملية شراء</span>
              </div>
              
              {/* Price */}
              <div className="flex items-center mb-6">
                <span className="text-2xl line-through text-gray-400 ml-3">499 ر.س</span>
                <span className="text-3xl font-bold text-green-600">299 ر.س</span>
                <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full mr-3">
                  خصم 40%
                </span>
              </div>
              
              {/* Key Features */}
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-bold mb-3">ماكينة حلاقة مبتكرة مع نظام شفط قوي</h2>
                <p className="mb-4">
                  تتميز ماكينة حلاقة تريم ماستر بنظام شفط قوي يمتص جميع الشعيرات المقصوصة، مما يجعل عملية الحلاقة أكثر نظافة وراحة.
                </p>
                <Button 
                  className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700"
                  onClick={() => document.getElementById('orderForm')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  اطلب الآن واحصل على خصم 40%
                </Button>
              </div>
              
              {/* Payment Methods */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs text-gray-500">طرق الدفع المتاحة</div>
                <div className="flex space-x-2">
                  {/* Payment Icons */}
                  <div className="h-6 w-10 bg-gray-200 rounded"></div>
                  <div className="h-6 w-10 bg-gray-200 rounded"></div>
                  <div className="h-6 w-10 bg-gray-200 rounded"></div>
                  <div className="h-6 w-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Description */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">ماكينة حلاقة مبتكرة مع نظام شفط قوي</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <img 
              src="/lovable-uploads/e60d8b6c-4b2a-4854-84ee-793561c6a0a0.png" 
              alt="تريم ماستر" 
              className="w-full h-auto"
            />
            <div className="p-6">
              <p className="text-lg mb-4">
                هذه الماكينة المبتكرة مزودة بنظام شفط قوي يمتص جميع الشعيرات المقصوصة.
                بفضل تريم ماستر، ستتمكن من الحلاقة بطريقة نظيفة ومريحة، دون الحاجة إلى تنظيف المكان بعد الحلاقة!
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <img 
              src="/lovable-uploads/47a4cdc2-f6c7-4f0a-b751-6bb273ad0d2d.png" 
              alt="تريم ماستر أثناء الاستخدام" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">لماذا تريم ماستر هو الحل الأمثل للحلاقة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-start mb-2">
                <Check className="text-green-600 w-5 h-5 ml-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">بدون فوضى الشعر</h3>
                  <p className="text-gray-600">
                    نظام الشفط المدمج يضمن أن جميع الشعيرات يتم التقاطها، مما يقلل من فوضى الشعر المتساقط.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-start mb-2">
                <Check className="text-green-600 w-5 h-5 ml-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">متعددة الاستخدامات</h3>
                  <p className="text-gray-600">
                    مثالية للحية، الشارب، شعر الرأس وحتى شعر الجسم.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-start mb-2">
                <Check className="text-green-600 w-5 h-5 ml-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">متينة وعالية الجودة</h3>
                  <p className="text-gray-600">
                    مصنوعة من مواد عالية الجودة، تناسب أيضاً استخدام رطب أو جاف.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-start mb-2">
                <Check className="text-green-600 w-5 h-5 ml-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">قابلة للشحن عبر USB</h3>
                  <p className="text-gray-600">
                    صغيرة الحجم وسهلة الشحن عبر USB، مثالية للسفر.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-start mb-2">
                <Check className="text-green-600 w-5 h-5 ml-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">قص متعدد الأطوال</h3>
                  <p className="text-gray-600">
                    تأتي مع عدة إعدادات طول للحصول على قصة مخصصة حسب رغبتك.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technical Specifications */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">المواصفات التقنية</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full ml-4">
                  <Battery className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold">المواد:</span> بلاستيك عالي الجودة
                </div>
              </li>
              
              <li className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full ml-4">
                  <Clock className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold">وقت الشحن:</span> حتى 2 ساعة
                </div>
              </li>
              
              <li className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full ml-4">
                  <Shield className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold">اللون:</span> أخضر
                </div>
              </li>
              
              <li className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full ml-4">
                  <Scissors className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold">الميزات:</span> ضبط إلكتروني للطول، قص من 1 ملم إلى 20 ملم، شاشة رقمية، مؤشر شحن
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Order Form */}
      <section id="orderForm" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-6">اطلب الآن واستفد من العرض الحصري</h2>
              
              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <div className="flex items-center mb-4">
                  <Truck className="w-6 h-6 text-green-600 ml-3" />
                  <div>
                    <h3 className="font-bold text-lg">الدفع عند الاستلام</h3>
                    <p className="text-gray-600">ادفع عند استلام المنتج مباشرة، لا حاجة للدفع المسبق</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <Truck className="w-6 h-6 text-green-600 ml-3" />
                  <div>
                    <h3 className="font-bold text-lg">شحن سريع لجميع المدن</h3>
                    <p className="text-gray-600">يصلك المنتج خلال 3-5 أيام عمل</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <RefreshCw className="w-6 h-6 text-green-600 ml-3" />
                  <div>
                    <h3 className="font-bold text-lg">ضمان استرجاع لمدة 30 يوم</h3>
                    <p className="text-gray-600">إذا لم تكن راضياً عن المنتج، يمكنك استرجاع أموالك كاملة</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <p className="text-amber-800 font-bold">عرض محدود: خصم 40% + شحن مجاني</p>
                <p className="text-amber-700">العرض ساري حتى نفاد الكمية!</p>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-center">اطلب الآن</h3>
                
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
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">تريم ماستر</div>
            <div className="text-sm text-gray-400">
              © 2024 جميع الحقوق محفوظة
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
