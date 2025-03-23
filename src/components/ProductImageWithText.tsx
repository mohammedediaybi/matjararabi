
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TextItem {
  id: string;
  content: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  isBold: boolean;
  isItalic: boolean;
}

interface ProductImageWithTextProps {
  imageSrc: string;
  alt?: string;
  className?: string;
  initialTexts?: TextItem[];
}

export default function ProductImageWithText({ 
  imageSrc, 
  alt = "صورة المنتج", 
  className,
  initialTexts = []
}: ProductImageWithTextProps) {
  const [texts, setTexts] = useState<TextItem[]>(initialTexts);
  
  const [newText, setNewText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState('#ffffff');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [activeTextId, setActiveTextId] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const addText = () => {
    if (!newText.trim() || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const newTextItem = {
      id: Date.now().toString(),
      content: newText,
      x: rect.width / 2,
      y: rect.height / 2,
      fontSize,
      color: textColor,
      isBold,
      isItalic
    };
    
    setTexts(prev => [...prev, newTextItem]);
    setNewText('');
  };
  
  const updateText = (id: string, updates: Partial<TextItem>) => {
    setTexts(prev => 
      prev.map(text => 
        text.id === id ? { ...text, ...updates } : text
      )
    );
  };
  
  const handleDragStart = (id: string) => {
    setActiveTextId(id);
  };
  
  const handleDeleteText = (id: string) => {
    setTexts(prev => prev.filter(text => text.id !== id));
    if (activeTextId === id) {
      setActiveTextId(null);
    }
  };
  
  const downloadImage = () => {
    if (!containerRef.current) return;
    
    const canvas = document.createElement('canvas');
    const container = containerRef.current;
    const image = container.querySelector('img');
    
    if (!image) return;
    
    canvas.width = image.width;
    canvas.height = image.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw the image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    // Draw the texts
    texts.forEach(text => {
      ctx.font = `${text.isItalic ? 'italic ' : ''}${text.isBold ? 'bold ' : ''}${text.fontSize}px Arial`;
      ctx.fillStyle = text.color;
      ctx.textAlign = 'center';
      
      // Scale text positions from container to canvas
      const scaleX = canvas.width / container.offsetWidth;
      const scaleY = canvas.height / container.offsetHeight;
      
      ctx.fillText(text.content, text.x * scaleX, text.y * scaleY);
    });
    
    // Download the image
    const link = document.createElement('a');
    link.download = 'product-with-text.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gray-100 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">إضافة نص إلى الصورة</h3>
        
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="أدخل النص"
            className="flex-1"
          />
          <Button onClick={addText}>إضافة</Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">حجم الخط</label>
            <Input
              type="number"
              min="8"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">لون النص</label>
            <div className="flex">
              <Input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-12 p-1 h-10"
              />
              <Input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="flex-1 mr-2"
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isBold}
              onChange={() => setIsBold(!isBold)}
              className="ml-2"
            />
            خط عريض
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isItalic}
              onChange={() => setIsItalic(!isItalic)}
              className="ml-2"
            />
            خط مائل
          </label>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className={cn("relative border border-gray-200 rounded-lg overflow-hidden", className)}
        style={{ minHeight: '400px' }}
      >
        <img 
          src={imageSrc} 
          alt={alt} 
          className="w-full h-auto"
          onLoad={() => setImageLoaded(true)}
        />
        
        {imageLoaded && texts.map((text) => (
          <motion.div
            key={text.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "absolute cursor-move flex items-center justify-center p-2",
              activeTextId === text.id ? "ring-2 ring-primary" : ""
            )}
            style={{
              left: `${text.x}px`,
              top: `${text.y}px`,
              transform: 'translate(-50%, -50%)',
              fontSize: `${text.fontSize}px`,
              color: text.color,
              fontWeight: text.isBold ? 'bold' : 'normal',
              fontStyle: text.isItalic ? 'italic' : 'normal',
            }}
            drag
            dragConstraints={containerRef}
            dragMomentum={false}
            onDragStart={() => handleDragStart(text.id)}
            onDragEnd={(_, info) => {
              if (containerRef.current) {
                const newX = text.x + info.offset.x;
                const newY = text.y + info.offset.y;
                updateText(text.id, { x: newX, y: newY });
              }
            }}
            onClick={() => setActiveTextId(text.id === activeTextId ? null : text.id)}
          >
            {text.content}
            
            {activeTextId === text.id && (
              <button 
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteText(text.id);
                }}
              >
                ×
              </button>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button onClick={downloadImage} className="bg-primary">
          تنزيل الصورة مع النص
        </Button>
      </div>
    </div>
  );
}
