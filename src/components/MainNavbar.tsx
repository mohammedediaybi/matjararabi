
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MainNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    { title: 'الرئيسية', path: '/email-landing' },
    { title: 'تأكيد الطلب', path: '/order-confirmation' },
    { title: 'تنزيل البيانات', path: '/download-json' },
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
          to="/email-landing" 
          className="font-display text-2xl font-bold transition-all duration-300 ease-in-out"
        >
          WAIKIL
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
        
        <div className="flex items-center">
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
