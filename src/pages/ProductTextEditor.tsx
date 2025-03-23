
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductImageWithText from '@/components/ProductImageWithText';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductTextEditor() {
  const [uploadedImage, setUploadedImage] = useState<string | null>('public/lovable-uploads/def579a3-607f-4ed4-8894-44bb93fbd6e7.png');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('الرجاء تحميل ملف صورة صالح');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setUploadedImage(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">محرر الصور مع نص</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">تحميل صورة المنتج</h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          <label className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-lg font-medium mb-2">اختر صورة أو اسحبها هنا</span>
            <span className="text-sm text-gray-500 mb-4">يفضل صور بخلفية شفافة (PNG)</span>
            <Input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
            />
            <Button className="bg-primary">اختر صورة</Button>
          </label>
        </div>
        
        {uploadedImage ? (
          <ProductImageWithText 
            imageSrc={uploadedImage} 
            initialTexts={[
              {
                id: "1",
                content: "ماكينة حلاقة متطورة",
                x: 150,
                y: 50,
                fontSize: 22,
                color: "#ffffff",
                isBold: true,
                isItalic: false
              },
              {
                id: "2",
                content: "تقنية متطورة لحلاقة مثالية",
                x: 150,
                y: 100,
                fontSize: 18,
                color: "#33ff33",
                isBold: false,
                isItalic: false
              },
              {
                id: "3",
                content: "خفيفة وسهلة الاستخدام",
                x: 150,
                y: 150,
                fontSize: 16,
                color: "#ffff00",
                isBold: false,
                isItalic: true
              }
            ]}
          />
        ) : (
          <div className="border border-gray-200 rounded-lg h-64 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">قم بتحميل صورة لإضافة نص عليها</p>
          </div>
        )}
      </div>
    </div>
  );
}
