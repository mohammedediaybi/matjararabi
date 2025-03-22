
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';

interface CallToActionProps {
  product: Product;
}

export default function CallToAction({ product }: CallToActionProps) {
  return (
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
  );
}
