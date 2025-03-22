
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ChevronRight, Truck, ShoppingBag, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Product } from '@/data/products';

interface OrderFormProps {
  product: Product;
}

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

export default function OrderForm({ product }: OrderFormProps) {
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

  return (
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
  );
}
