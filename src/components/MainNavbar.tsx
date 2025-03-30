
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function MainNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
      isScrolled ? "bg-white shadow-md py-2" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">
          وايكيل
        </Link>
        
        <div className="flex items-center space-x-6 space-x-reverse">
          <Link to="/trim-master" className="text-gray-700 hover:text-green-600 transition">
            الرئيسية
          </Link>
          <Link to="/download-json" className="text-gray-700 hover:text-green-600 transition">
            تحميل
          </Link>
        </div>
      </div>
    </nav>
  );
}
