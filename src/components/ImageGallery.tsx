
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(Array(images.length).fill(false));
  
  // Preload all images
  useEffect(() => {
    const imagePromises = images.map((src, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setLoaded(prev => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
          });
          resolve();
        };
      });
    });
    
    Promise.all(imagePromises);
  }, [images]);
  
  const handleNext = () => {
    setSelectedIndex(prev => (prev + 1) % images.length);
  };
  
  const handlePrev = () => {
    setSelectedIndex(prev => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <div className="select-none">
      <div className="relative rounded-2xl overflow-hidden bg-accent/20 h-[400px] md:h-[500px] mb-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <div className={cn(
              "absolute inset-0 transition-opacity duration-300",
              !loaded[selectedIndex] && "image-loading"
            )}>
              <img
                src={images[selectedIndex]}
                alt={`${productName} - صورة ${selectedIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </AnimatePresence>
        
        <button 
          onClick={handlePrev}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-200"
          aria-label="السابق"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        <button 
          onClick={handleNext}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-200"
          aria-label="التالي"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "h-20 rounded-lg overflow-hidden border-2 transition-all duration-200",
              index === selectedIndex 
                ? "border-primary" 
                : "border-transparent hover:border-muted-foreground/20"
            )}
          >
            <div className={cn(
              "w-full h-full transition-opacity duration-300",
              !loaded[index] && "image-loading"
            )}>
              <img
                src={image}
                alt={`${productName} - صورة مصغرة ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
