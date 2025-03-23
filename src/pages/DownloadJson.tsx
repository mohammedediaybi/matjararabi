
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Image } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";
import Footer from "@/components/email-landing/Footer";
import { toast } from "sonner";

// More standard format for page data
type PageData = {
  id: string;
  name: string;
  route: string;
  components: string[];
  description: string;
  metadata: {
    type: string;
    version: string;
    created: string;
  };
  content: {
    sections: Array<{
      id: string;
      type: string;
      name: string;
    }>;
  };
};

export default function DownloadJson() {
  const [selectedPage, setSelectedPage] = useState<string>("");

  // Données des pages disponibles with standardized format
  const pages: PageData[] = [
    {
      id: "email-landing",
      name: "الصفحة الرئيسية",
      route: "email-landing",
      components: ["Header", "ProductHeader", "ProductDetails", "OrderForm", "Testimonials", "CallToAction", "Footer"],
      description: "الصفحة الرئيسية للموقع التي تعرض المنتج وتفاصيله",
      metadata: {
        type: "page",
        version: "1.0",
        created: new Date().toISOString(),
      },
      content: {
        sections: [
          { id: "header", type: "component", name: "Header" },
          { id: "product-header", type: "component", name: "ProductHeader" },
          { id: "product-details", type: "component", name: "ProductDetails" },
          { id: "order-form", type: "component", name: "OrderForm" },
          { id: "testimonials", type: "component", name: "Testimonials" },
          { id: "call-to-action", type: "component", name: "CallToAction" },
          { id: "footer", type: "component", name: "Footer" }
        ]
      }
    },
    {
      id: "order-confirmation",
      name: "تأكيد الطلب",
      route: "order-confirmation",
      components: ["OrderConfirmation"],
      description: "صفحة تأكيد الطلب التي تظهر بعد إتمام عملية الشراء",
      metadata: {
        type: "page",
        version: "1.0",
        created: new Date().toISOString(),
      },
      content: {
        sections: [
          { id: "order-confirmation", type: "component", name: "OrderConfirmation" }
        ]
      }
    },
    {
      id: "download-json",
      name: "تنزيل البيانات",
      route: "download-json",
      components: ["DownloadJson"],
      description: "صفحة لتنزيل بيانات صفحات الموقع بتنسيق JSON",
      metadata: {
        type: "page",
        version: "1.0",
        created: new Date().toISOString(),
      },
      content: {
        sections: [
          { id: "download-json", type: "component", name: "DownloadJson" }
        ]
      }
    }
  ];

  // Fonction pour télécharger le JSON sélectionné
  const handleDownload = () => {
    if (!selectedPage) {
      toast.error("الرجاء اختيار صفحة أولاً");
      return;
    }
    
    const pageData = pages.find(page => page.id === selectedPage);
    if (!pageData) return;
    
    // Add additional metadata for better compatibility
    const exportData = {
      ...pageData,
      exportVersion: "2.0",
      exportDate: new Date().toISOString(),
      format: "standard-page-format"
    };
    
    // Création du fichier blob pour le téléchargement
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    // Création d'un lien de téléchargement et déclenchement du téléchargement
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedPage}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Nettoyage
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("تم تنزيل الملف بنجاح");
  };

  // Fonction pour télécharger la page en PNG
  const handleDownloadAsPng = async () => {
    if (!selectedPage) {
      toast.error("الرجاء اختيار صفحة أولاً");
      return;
    }
    
    const pageData = pages.find(page => page.id === selectedPage);
    if (!pageData) return;
    
    try {
      // Créer un élément canvas pour dessiner le JSON
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        toast.error("لا يمكن إنشاء صورة. Canvas غير مدعوم في متصفحك");
        return;
      }
      
      // Configurer le canvas
      canvas.width = 800;
      canvas.height = 1200;
      
      // Fond blanc
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Configurer le style du texte
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      
      // Dessiner le titre
      ctx.fillText(pageData.name, canvas.width / 2, 50);
      
      // Dessiner la description
      ctx.font = '16px Arial';
      ctx.fillText(pageData.description, canvas.width / 2, 90);
      
      // Dessiner une ligne de séparation
      ctx.strokeStyle = '#cccccc';
      ctx.beginPath();
      ctx.moveTo(50, 120);
      ctx.lineTo(canvas.width - 50, 120);
      ctx.stroke();
      
      // Dessiner les informations de la page
      ctx.textAlign = 'left';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('معلومات الصفحة:', 50, 160);
      
      ctx.font = '16px Arial';
      ctx.fillText(`المعرف: ${pageData.id}`, 50, 190);
      ctx.fillText(`المسار: ${pageData.route}`, 50, 220);
      ctx.fillText(`نوع: ${pageData.metadata.type}`, 50, 250);
      ctx.fillText(`إصدار: ${pageData.metadata.version}`, 50, 280);
      
      // Dessiner les composants
      ctx.font = 'bold 18px Arial';
      ctx.fillText('المكونات:', 50, 330);
      
      ctx.font = '16px Arial';
      pageData.components.forEach((comp, index) => {
        ctx.fillText(comp, 50, 360 + (index * 30));
      });
      
      // Convertir le canvas en image PNG
      const dataUrl = canvas.toDataURL('image/png');
      
      // Télécharger l'image
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${selectedPage}.png`;
      document.body.appendChild(a);
      a.click();
      
      // Nettoyage
      document.body.removeChild(a);
      
      toast.success("تم تنزيل الصورة بنجاح");
    } catch (error) {
      console.error('Error creating PNG:', error);
      toast.error("حدث خطأ أثناء إنشاء الصورة");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background font-tajawal flex flex-col" dir="rtl">
      <MainNavbar />
      
      <div className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">تنزيل بيانات الصفحة</h1>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">اختر الصفحة</label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر صفحة للتنزيل" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedPage && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2 text-gray-800">
                  {pages.find(page => page.id === selectedPage)?.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {pages.find(page => page.id === selectedPage)?.description}
                </p>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold block mb-1">المكونات:</span>
                  <div className="flex flex-wrap gap-1">
                    {pages.find(page => page.id === selectedPage)?.components.map((comp) => (
                      <span key={comp} className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleDownload} 
                className="flex-1 bg-green-600 hover:bg-green-700" 
                disabled={!selectedPage}
              >
                <Download className="ml-2" size={16} />
                تنزيل كملف JSON
              </Button>
              
              <Button 
                onClick={handleDownloadAsPng} 
                className="flex-1 bg-blue-600 hover:bg-blue-700" 
                disabled={!selectedPage}
              >
                <Image className="ml-2" size={16} />
                تنزيل كصورة PNG
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
