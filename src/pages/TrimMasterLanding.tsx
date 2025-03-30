import { motion } from 'framer-motion';
import { Star, Check, Truck, Clock, Shield, RefreshCw, Battery, Scissors, DollarSign, Settings } from 'lucide-react';
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
    message: "يجب أن يحتوي الاسم على حرفين على الأقل"
  }),
  phone: z.string().min(8, {
    message: "يرجى إدخال رقم هاتف صحيح"
  }),
  city: z.string().min(2, {
    message: "يرجى إدخال اسم المدينة"
  })
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
      city: ""
    }
  });
  const images = ["/lovable-uploads/2a73b697-62b8-40de-88a1-ddbb0f60547c.png", "/lovable-uploads/cb1df814-4b79-4ed5-b59b-3bfd7ba0a7cc.png", "/lovable-uploads/36516a49-762c-4a23-80e3-3ab98bd6d0b2.png", "/lovable-uploads/60e98e5c-4c44-4f50-b0db-e86b212f1560.png", "/lovable-uploads/ac3cb792-4b9b-4861-9960-b57079f02000.png", "/lovable-uploads/a4c199c0-2d56-4ed3-9d43-02ce0c388be9.png"];
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const orderData = {
        product: "تريم ماستر - ماكينة حلاقة بنظام الشفط",
        price: "299 ر.س",
        customerName: values.name,
        customerPhone: values.phone,
        customerCity: values.city,
        orderDate: new Date().toISOString()
      };
      console.log("Sending order data:", orderData);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      formData.append('city', values.city);
      formData.append('product', "تريم ماستر - ماكينة حلاقة بنظام الشفط");
      formData.append('price', "299 ر.س");
      formData.append('_subject', "طلب جديد: تريم ماستر");
      formData.append('_next', window.location.origin + '/order-confirmation');
      const response = await fetch("https://formsubmit.co/ediaybimohammed@gmail.com", {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        const jsonResponse = await fetch("https://formsubmit.co/ajax/ediaybimohammed@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: values.name,
            phone: values.phone,
            city: values.city,
            product: "تريم ماستر - ماكينة حلاقة بنظام الشفط",
            price: "299 ر.س",
            _subject: "طلب جديد: تريم ماستر"
          })
        });
        if (!jsonResponse.ok) {
          throw new Error("فشلت جميع محاولات إرسال الطلب");
        }
      }
      console.log("Order submitted successfully!");
      navigate('/order-confirmation');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return <div className="min-h-screen bg-gradient-to-b from-lime-50 to-gray-50 font-tajawal" dir="rtl">
      {/* Header Section */}
      <header className="bg-green-800 text-white py-2 text-center text-sm">
        <div className="container mx-auto">
          طلب مرتفع! المخزون محدود - استفد من الخصم اليوم
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="bg-white py-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-700">تريم ماستر</div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="bg-lime-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              موثوق ✓
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-center h-96">
                <img src={images[currentImage]} alt="تريم ماستر" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => <div key={idx} className={`border cursor-pointer rounded-md overflow-hidden ${currentImage === idx ? 'border-green-500' : 'border-gray-200'}`} onClick={() => setCurrentImage(idx)}>
                    <img src={img} alt={`صورة ${idx + 1}`} className="w-full h-20 object-cover" />
                  </div>)}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2">
              <div className="text-xs text-gray-500 mb-2">+8500 عميل راضٍ على تريم ماستر</div>
              <h1 className="text-3xl font-bold mb-2">تريم ماستر | استمتع بحلاقة نظيفة، سريعة وسهلة.</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400 ml-2">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-4 h-4 ${star <= 4.5 ? "fill-amber-400" : ""}`} />)}
                </div>
                <span className="text-sm">ممتاز 4.5 | </span>
                <span className="text-sm text-green-600 mr-1">✓ متجر موثوق</span>
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
              <div className="bg-lime-50 border border-lime-200 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-bold mb-3 text-green-800">ماكينة حلاقة مبتكرة مع نظام شفط قوي</h2>
                <p className="mb-4">
                  هذه الماكينة المبتكرة مزودة بنظام شفط قوي يمتص جميع الشعيرات المقصوصة.
                  بفضل تريم ماستر، سيبقى حوضك وأرضيتك نظيفين، دون الحاجة إلى التنظيف بعد الحلاقة!
                </p>
                <Button className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700" onClick={() => document.getElementById('orderForm')?.scrollIntoView({
                behavior: 'smooth'
              })}>اطلب الآن</Button>
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center mb-6 text-amber-600">
                <div className="w-full bg-amber-100 rounded-full h-2.5 mb-4 dark:bg-amber-200">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{
                  width: '85%'
                }}></div>
                </div>
                <span className="text-sm font-medium mr-2">الطلب مرتفع! المخزون محدود</span>
              </div>
              
              {/* Payment Methods */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs text-gray-500">طرق الدفع المتاحة</div>
                <div className="flex space-x-2 space-x-reverse">
                  
                  <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-xs">COD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Description */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-green-800">ماكينة حلاقة مبتكرة مع نظام شفط قوي</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <img src="/lovable-uploads/2a73b697-62b8-40de-88a1-ddbb0f60547c.png" alt="تريم ماستر" className="w-full h-auto" />
            <div className="p-6">
              <p className="text-lg mb-4">
                هذه الماكينة المبتكرة مزودة بنظام شفط قوي يمتص جميع الشعيرات المقصوصة.
                بفضل تريم ماستر، سيبقى حوضك وأرضيتك نظيفين، دون الحاجة إلى التنظيف بعد الحلاقة!
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <img src="/lovable-uploads/ac3cb792-4b9b-4861-9960-b57079f02000.png" alt="تريم ماستر - عجلة الدقة" className="w-full h-auto" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-green-800">عجلة دقيقة للضبط المثالي</h3>
              <p className="text-lg">
                العجلة الدقيقة تتيح لك 20 إعداد مختلف للطول (1-20 مم) للحصول على قصة مخصصة حسب رغبتك.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <img src="/lovable-uploads/cb1df814-4b79-4ed5-b59b-3bfd7ba0a7cc.png" alt="تريم ماستر - مقاومة للماء" className="w-full h-auto" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-green-800">مقاومة للماء IPX6</h3>
              <p className="text-lg">
                تصميم مقاوم للماء بمعيار IPX6 يسمح لك باستخدامها في الحمام أو تحت الدش.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-green-800">لماذا تريم ماستر هو الحل الأمثل للحلاقة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-lime-50 p-6 rounded-lg">
              <div className="flex items-start mb-2">
                <Check className="text-green-600 w-5 h-5 ml-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">بدون فوضى</h3>
                  <p className="text-gray-600">
                    نظام الشفط المدمج يضمن التقاط جميع الشعيرات بشكل نظيف، دون ترك فوضى وراءها.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-lime-50 p-6 rounded-lg">
              <div className="flex items-start mb-2">
                <Check className="text-green-600 w-5 h-5 ml-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">متعددة الاستخدامات</h3>
                  <p className="text-gray-600">
                    مثالية للحية، الشارب، السوالف وحتى شعر الجسم.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-lime-50 p-6 rounded-lg">
              <div className="flex items-start mb-2">
                <Check className="text-green-600 w-5 h-5 ml-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">متينة ومقاومة للماء</h3>
                  <p className="text-gray-600">
                    مصنوعة من مواد عالية الجودة، تناسب أيضاً الاستخدام الرطب والجاف.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-lime-50 p-6 rounded-lg">
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
            
            <div className="bg-lime-50 p-6 rounded-lg">
              <div className="flex items-start mb-2">
                <Check className="text-green-600 w-5 h-5 ml-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">قص متعدد الأطوال</h3>
                  <p className="text-gray-600">
                    تأتي مع مشطين قابلين للتعديل وإعدادات طول متعددة للحصول على قصة مخصصة.
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
          <h2 className="text-2xl font-bold mb-8 text-center text-green-800">المواصفات التقنية</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="bg-lime-100 p-2 rounded-full ml-4">
                  <Settings className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold">المواد:</span> ABS + ستانلس ستيل
                </div>
              </li>
              
              <li className="flex items-center">
                <div className="bg-lime-100 p-2 rounded-full ml-4">
                  <Clock className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold">وقت الشحن:</span> حتى ساعتين
                </div>
              </li>
              
              <li className="flex items-center">
                <div className="bg-lime-100 p-2 rounded-full ml-4">
                  <Shield className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold">اللون:</span> أخضر
                </div>
              </li>
              
              <li className="flex items-center">
                <div className="bg-lime-100 p-2 rounded-full ml-4">
                  <Scissors className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold">الميزات:</span> ضبط إلكتروني للطول، قص رطب، قص جاف، شحن سريع، مؤشر شحن
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Picture Gallery */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-green-800">معرض الصور</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div className="rounded-lg overflow-hidden shadow-md" whileHover={{
            scale: 1.03
          }} transition={{
            duration: 0.3
          }}>
              <img src="/lovable-uploads/36516a49-762c-4a23-80e3-3ab98bd6d0b2.png" alt="تريم ماستر - القطع الداخلية" className="w-full h-auto" />
            </motion.div>
            
            <motion.div className="rounded-lg overflow-hidden shadow-md" whileHover={{
            scale: 1.03
          }} transition={{
            duration: 0.3
          }}>
              <img src="/lovable-uploads/60e98e5c-4c44-4f50-b0db-e86b212f1560.png" alt="تريم ماستر - نظام الشفط" className="w-full h-auto" />
            </motion.div>
            
            <motion.div className="rounded-lg overflow-hidden shadow-md" whileHover={{
            scale: 1.03
          }} transition={{
            duration: 0.3
          }}>
              <img src="/lovable-uploads/a4c199c0-2d56-4ed3-9d43-02ce0c388be9.png" alt="تريم ماستر - الشحن" className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Order Form */}
      <section id="orderForm" className="py-12 bg-lime-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-6 text-green-800">اطلب الآن واستفد من العرض الحصري</h2>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
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
                <h3 className="text-2xl font-bold mb-6 text-center text-green-800">اطلب الآن</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="name" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>الاسم الكامل</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسمك الكامل" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="phone" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل رقم هاتفك" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="city" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>المدينة</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسم مدينتك" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <Button type="submit" className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
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
            <div className="text-2xl font-bold mb-4 md:mb-0 text-green-400">تريم ماستر</div>
            <div className="text-sm text-gray-400">
              © 2024 جميع الحقوق محفوظة
            </div>
          </div>
        </div>
      </footer>
    </div>;
}