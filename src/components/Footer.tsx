
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-accent mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-right">
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-xl font-display font-bold mb-4">متجر فاخر</h3>
            <p className="text-muted-foreground mb-6">
              نقدم لكم أفضل المنتجات بأعلى جودة وبأسعار مناسبة مع خدمة عملاء ممتازة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all duration-200 hover:bg-primary hover:text-white"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all duration-200 hover:bg-primary hover:text-white"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all duration-200 hover:bg-primary hover:text-white"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  المتجر
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4">خدمات</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  معلومات الشحن
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  سياسة الإرجاع
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  الأسئلة المتكررة
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4">اتصل بنا</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="ml-2 text-primary" size={18} />
                <span className="text-muted-foreground">شارع الملك فهد، الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center">
                <Phone className="ml-2 text-primary" size={18} />
                <span className="text-muted-foreground">+966 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="ml-2 text-primary" size={18} />
                <span className="text-muted-foreground">info@luxurystore.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} متجر فاخر. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
