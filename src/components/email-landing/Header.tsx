
import { Product } from '@/data/products';

interface HeaderProps {
  product: Product;
}

export default function Header({ product }: HeaderProps) {
  return (
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
  );
}
