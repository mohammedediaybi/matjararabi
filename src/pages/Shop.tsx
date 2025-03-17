
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { cn } from '@/lib/utils';

export default function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [activeSort, setActiveSort] = useState<string>("featured");
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    result = result.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply sorting
    switch (activeSort) {
      case "priceLow":
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case "priceHigh":
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case "newest":
        // In a real app, you would sort by date
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default is "featured", no sorting needed
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, priceRange, activeSort]);
  
  // Categories (in a real app, you would fetch these)
  const categories = ["Electronics", "Clothing", "Home", "Beauty"];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-28 pb-10 px-4 md:px-0 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center">
            <motion.h1 
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              تسوق جميع المنتجات
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              اكتشف مجموعتنا الكاملة من المنتجات الإلكترونية عالية الجودة
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Shop Section */}
      <section className="py-10 px-4 md:px-0 flex-grow">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters (Desktop) */}
            <motion.div 
              className="hidden md:block w-64 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="font-bold text-lg mb-3">الفئات</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className={cn(
                        "text-right w-full py-1 transition-colors",
                        selectedCategory === null ? "text-primary font-medium" : "text-foreground/70 hover:text-primary"
                      )}
                    >
                      جميع الفئات
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category}>
                      <button 
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "text-right w-full py-1 transition-colors",
                          selectedCategory === category ? "text-primary font-medium" : "text-foreground/70 hover:text-primary"
                        )}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">السعر</h3>
                <div className="px-1">
                  <div className="relative h-2 bg-muted rounded-full mb-4">
                    <div 
                      className="absolute h-full bg-primary rounded-full"
                      style={{ 
                        left: `${(priceRange[0] / 1000) * 100}%`, 
                        right: `${100 - (priceRange[1] / 1000) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      {priceRange[0]} ر.س
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {priceRange[1]} ر.س
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Mobile Filters Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="w-full flex items-center justify-center py-2 px-4 border border-border rounded-lg"
              >
                <Filter className="w-4 h-4 ml-2" />
                <span>الفلاتر</span>
              </button>
            </div>
            
            {/* Mobile Filters Sidebar */}
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
                <motion.div 
                  className="absolute top-0 right-0 h-full w-4/5 max-w-xs bg-background p-6 overflow-auto"
                  initial={{ x: 300 }}
                  animate={{ x: 0 }}
                  exit={{ x: 300 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-xl">الفلاتر</h2>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-muted"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-lg mb-3">الفئات</h3>
                      <ul className="space-y-2">
                        <li>
                          <button 
                            onClick={() => {
                              setSelectedCategory(null);
                              setIsFilterOpen(false);
                            }}
                            className={cn(
                              "text-right w-full py-2 transition-colors",
                              selectedCategory === null ? "text-primary font-medium" : "text-foreground/70"
                            )}
                          >
                            جميع الفئات
                          </button>
                        </li>
                        {categories.map(category => (
                          <li key={category}>
                            <button 
                              onClick={() => {
                                setSelectedCategory(category);
                                setIsFilterOpen(false);
                              }}
                              className={cn(
                                "text-right w-full py-2 transition-colors",
                                selectedCategory === category ? "text-primary font-medium" : "text-foreground/70"
                              )}
                            >
                              {category}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg mb-3">السعر</h3>
                      <div className="px-1">
                        <div className="relative h-2 bg-muted rounded-full mb-4">
                          <div 
                            className="absolute h-full bg-primary rounded-full"
                            style={{ 
                              left: `${(priceRange[0] / 1000) * 100}%`, 
                              right: `${100 - (priceRange[1] / 1000) * 100}%` 
                            }}
                          />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            {priceRange[0]} ر.س
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {priceRange[1]} ر.س
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="w-full py-2 bg-primary text-white rounded-lg font-medium"
                    >
                      تطبيق الفلاتر
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
            
            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort Controls */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  عرض {filteredProducts.length} منتج
                </p>
                
                <div className="relative">
                  <div className="flex items-center border rounded-lg py-2 px-4 cursor-pointer">
                    <span className="text-sm">ترتيب حسب: </span>
                    <span className="text-sm font-medium mr-1">
                      {activeSort === "featured" && "مميز"}
                      {activeSort === "priceLow" && "السعر: من الأقل للأعلى"}
                      {activeSort === "priceHigh" && "السعر: من الأعلى للأقل"}
                      {activeSort === "newest" && "الأحدث"}
                      {activeSort === "rating" && "التقييم"}
                    </span>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    
                    <select 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      value={activeSort}
                      onChange={(e) => setActiveSort(e.target.value)}
                    >
                      <option value="featured">مميز</option>
                      <option value="priceLow">السعر: من الأقل للأعلى</option>
                      <option value="priceHigh">السعر: من الأعلى للأقل</option>
                      <option value="newest">الأحدث</option>
                      <option value="rating">التقييم</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <h3 className="text-lg font-medium mb-2">لا توجد منتجات</h3>
                  <p className="text-muted-foreground">جرب تغيير الفلاتر للعثور على المنتجات</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
