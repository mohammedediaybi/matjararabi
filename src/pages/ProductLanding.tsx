
import { useState } from 'react';
import { getProductById } from '@/data/products';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Star, Truck, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

export default function ProductLanding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const product = getProductById("4"); // ID du rasoir SOPANVER
  
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
      // Construire le message WhatsApp
      const message = encodeURIComponent(
        `طلب جديد! 🔔\n\nالمنتج: ${product?.arabicTitle}\n\nمعلومات العميل:\nالاسم: ${values.name}\nرقم الهاتف: ${values.phone}\nالمدينة: ${values.city}`
      );
      
      // Créer le lien WhatsApp avec le message
      const whatsappUrl = `https://api.whatsapp.com/send?phone=33646470933&text=${message}`;
      
      // Ouvrir WhatsApp dans un nouvel onglet
      window.open(whatsappUrl, '_blank');
      
      // Afficher un message de succès
      toast.success("تم إرسال طلبك بنجاح! سنتصل بك قريبًا.", {
        duration: 5000,
      });
      
      // Rediriger vers la page du produit après une courte pause
      setTimeout(() => {
        navigate(`/product/${product?.id}`);
      }, 2000);
      
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
    <div className="min-h-screen bg-accent/10 font-tajawal" dir="rtl">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/20 to-background pt-10 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-noto font-bold mb-4 text-primary">
                ماكينة حلاقة اللحية الاحترافية
              </h1>
              <p className="text-xl mb-6">
                تخلص من فوضى الشعر مع نظام الشفط المدمج وتمتع بتجربة حلاقة احترافية
              </p>
              
              <div className="flex items-center mb-6">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold">{product.reviews}+ تقييم</span>
              </div>
              
              <div className="bg-background p-4 rounded-lg shadow-md mb-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="text-primary w-5 h-5 ml-2" />
                  <span>نظام شفط قوي لتجميع الشعر أثناء الحلاقة</span>
                </div>
                <div className="flex items-center mb-3">
                  <CheckCircle className="text-primary w-5 h-5 ml-2" />
                  <span>20 إعداد دقيق للطول لتصفيف اللحية بدقة</span>
                </div>
                <div className="flex items-center mb-3">
                  <CheckCircle className="text-primary w-5 h-5 ml-2" />
                  <span>شاشة LED وتصميم مقاوم للماء IPX6</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-primary w-5 h-5 ml-2" />
                  <span>بطارية تدوم طويلاً مع شحن USB-C</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-2xl line-through text-muted-foreground ml-3">{product.price} ر.س</span>
                <span className="text-3xl font-bold text-primary">{product.discountPrice} ر.س</span>
                <span className="bg-primary text-white text-sm px-3 py-1 rounded-full mr-3">
                  خصم {Math.round(((product.price - (product.discountPrice || 0)) / product.price) * 100)}%
                </span>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src={product.images[0]} 
                alt={product.arabicTitle} 
                className="max-w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  console.error(`Error loading image: ${product.images[0]}`);
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-noto font-bold mb-12 text-center">مميزات فريدة لتجربة حلاقة مثالية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.images.slice(1, 4).map((image, index) => (
              <motion.div 
                key={index}
                className="bg-accent/10 rounded-lg p-6 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="w-40 h-40 mb-4">
                  <img 
                    src={image} 
                    alt={`ميزة ${index + 1}`} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {index === 0 ? "نظام شفط متطور" : 
                   index === 1 ? "تحكم دقيق في الطول" : 
                   "تصميم مقاوم للماء"}
                </h3>
                <p className="text-muted-foreground">
                  {index === 0 ? "يجمع 99% من الشعر أثناء الحلاقة لتنظيف سهل وسريع" : 
                   index === 1 ? "20 إعداد للطول لتصفيف دقيق للحية والشارب" : 
                   "تصميم مقاوم للماء IPX6 يسمح بالاستخدام تحت الدش"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Order Form Section */}
      <div className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-noto font-bold mb-6">اطلب الآن واستفد من العرض</h2>
              
              <div className="bg-background p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center mb-4">
                  <Truck className="w-6 h-6 text-primary ml-3" />
                  <div>
                    <h3 className="font-bold text-lg">الدفع عند الاستلام</h3>
                    <p className="text-muted-foreground">ادفع عند استلام المنتج مباشرة، لا حاجة للدفع المسبق</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <ShoppingBag className="w-6 h-6 text-primary ml-3" />
                  <div>
                    <h3 className="font-bold text-lg">شحن سريع لجميع المدن</h3>
                    <p className="text-muted-foreground">يصلك المنتج خلال 3-5 أيام عمل</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <p className="text-amber-800 font-bold">عرض محدود: خصم {Math.round(((product.price - (product.discountPrice || 0)) / product.price) * 100)}% + شحن مجاني</p>
                <p className="text-amber-700">العرض ساري حتى نفاد الكمية!</p>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-background p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-noto font-bold mb-6 text-center">اطلب الآن</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      className="w-full py-6 text-lg font-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "جاري إرسال الطلب..." : "اطلب الآن"}
                      <ChevronRight className="w-5 h-5 mr-1" />
                    </Button>
                    
                    <p className="text-center text-sm text-muted-foreground">
                      بالضغط على "اطلب الآن" أنت توافق على سياسة الخصوصية وشروط الاستخدام
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-noto font-bold mb-12 text-center">ماذا يقول عملاؤنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "أحمد محمد",
                text: "أفضل ماكينة حلاقة استخدمتها على الإطلاق. نظام الشفط رائع حقًا ويوفر الكثير من الفوضى!",
                rating: 5
              },
              {
                name: "سعيد العمري",
                text: "جودة ممتازة وبطارية تدوم لفترة طويلة. أنصح بها بشدة لمن يبحث عن تجربة حلاقة احترافية.",
                rating: 5
              },
              {
                name: "خالد السعيد",
                text: "الإعدادات المتعددة للطول مفيدة جدًا لتصفيف اللحية بالشكل المطلوب. المنتج يستحق سعره.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-accent/10 p-6 rounded-lg"
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
                <p className="mb-4">{testimonial.text}</p>
                <p className="font-bold">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-noto font-bold mb-6">احصل على ماكينة حلاقة اللحية الاحترافية الآن</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            لا تفوت فرصة الحصول على منتج عالي الجودة بسعر مخفض. اطلب الآن واستمتع بالدفع عند الاستلام.
          </p>
          <Button 
            className="text-lg py-6 px-8"
            onClick={() => {
              document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            اطلب الآن واحصل على خصم {Math.round(((product.price - (product.discountPrice || 0)) / product.price) * 100)}%
            <ChevronRight className="w-5 h-5 mr-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
