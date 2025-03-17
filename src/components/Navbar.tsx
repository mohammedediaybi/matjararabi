
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '@/utils/cartStore';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCartStore(state => state.getCartCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { title: 'الرئيسية', path: '/' },
    { title: 'المتجر', path: '/shop' },
    { title: 'حول', path: '/about' },
    { title: 'اتصل بنا', path: '/contact' },
  ];
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'glassmorphism py-3 shadow-sm' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-display text-2xl font-bold transition-all duration-300 ease-in-out"
        >
          متجر فاخر
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-2 mx-1 rounded-lg text-sm font-medium transition-all duration-200',
                location.pathname === item.path
                  ? 'text-primary bg-primary/5'
                  : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200">
            <Search size={20} />
          </button>
          
          <Link to="/cart" className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200 relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center animate-scale-in">
                {cartCount}
              </span>
            )}
          </Link>
          
          <button 
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glassmorphism shadow-lg mt-2 mx-4 rounded-xl overflow-hidden animate-slide-up">
          <nav className="flex flex-col py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'px-5 py-3 text-right text-base font-medium transition-all duration-200',
                  location.pathname === item.path
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
