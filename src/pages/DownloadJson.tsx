
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

// Structure des données pour chaque page
type PageData = {
  pageName: string;
  pageRoute: string;
  components: string[];
  description: string;
};

export default function DownloadJson() {
  const [selectedPage, setSelectedPage] = useState<string>("");

  // Données des pages disponibles
  const pages: PageData[] = [
    {
      pageName: "الصفحة الرئيسية",
      pageRoute: "email-landing",
      components: ["Header", "ProductHeader", "ProductDetails", "OrderForm", "Testimonials", "CallToAction", "Footer"],
      description: "الصفحة الرئيسية للموقع التي تعرض المنتج وتفاصيله"
    },
    {
      pageName: "تأكيد الطلب",
      pageRoute: "order-confirmation",
      components: ["OrderConfirmation"],
      description: "صفحة تأكيد الطلب التي تظهر بعد إتمام عملية الشراء"
    },
    {
      pageName: "تنزيل البيانات",
      pageRoute: "download-json",
      components: ["DownloadJson"],
      description: "صفحة لتنزيل بيانات صفحات الموقع بتنسيق JSON"
    }
  ];

  // Fonction pour télécharger le JSON sélectionné
  const handleDownload = () => {
    if (!selectedPage) return;
    
    const pageData = pages.find(page => page.pageRoute === selectedPage);
    if (!pageData) return;
    
    // Création du fichier blob pour le téléchargement
    const blob = new Blob([JSON.stringify(pageData, null, 2)], { type: "application/json" });
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
                    <SelectItem key={page.pageRoute} value={page.pageRoute}>
                      {page.pageName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedPage && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2 text-gray-800">
                  {pages.find(page => page.pageRoute === selectedPage)?.pageName}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {pages.find(page => page.pageRoute === selectedPage)?.description}
                </p>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold block mb-1">المكونات:</span>
                  <div className="flex flex-wrap gap-1">
                    {pages.find(page => page.pageRoute === selectedPage)?.components.map((comp) => (
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
