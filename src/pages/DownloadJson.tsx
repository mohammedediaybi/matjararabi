
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
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
            
            <Button 
              onClick={handleDownload} 
              className="w-full bg-green-600 hover:bg-green-700" 
              disabled={!selectedPage}
            >
              <Download className="ml-2" size={16} />
              تنزيل البيانات بتنسيق JSON
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
