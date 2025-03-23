import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Image, FileText } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";
import Footer from "@/components/email-landing/Footer";
import { toast } from "sonner";
import html2pdf from 'html2pdf.js';

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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

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

  const handleDownload = () => {
    if (!selectedPage) {
      toast.error("الرجاء اختيار صفحة أولاً");
      return;
    }
    
    const pageData = pages.find(page => page.id === selectedPage);
    if (!pageData) return;
    
    const exportData = {
      ...pageData,
      exportVersion: "2.0",
      exportDate: new Date().toISOString(),
      format: "standard-page-format"
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedPage}.json`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("تم تنزيل الملف بنجاح");
  };

  const handleDownloadAsPng = async () => {
    if (!selectedPage) {
      toast.error("الرجاء اختيار صفحة أولاً");
      return;
    }
    
    const pageData = pages.find(page => page.id === selectedPage);
    if (!pageData) return;
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        toast.error("لا يمكن إنشاء صورة. Canvas غير مدعوم في متصفحك");
        return;
      }
      
      canvas.width = 800;
      canvas.height = 1200;
      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      
      ctx.fillText(pageData.name, canvas.width / 2, 50);
      
      ctx.font = '16px Arial';
      ctx.fillText(pageData.description, canvas.width / 2, 90);
      
      ctx.strokeStyle = '#cccccc';
      ctx.beginPath();
      ctx.moveTo(50, 120);
      ctx.lineTo(canvas.width - 50, 120);
      ctx.stroke();
      
      ctx.textAlign = 'left';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('معلومات الصفحة:', 50, 160);
      
      ctx.font = '16px Arial';
      ctx.fillText(`المعرف: ${pageData.id}`, 50, 190);
      ctx.fillText(`المسار: ${pageData.route}`, 50, 220);
      ctx.fillText(`نوع: ${pageData.metadata.type}`, 50, 250);
      ctx.fillText(`إصدار: ${pageData.metadata.version}`, 50, 280);
      
      ctx.font = 'bold 18px Arial';
      ctx.fillText('المكونات:', 50, 330);
      
      ctx.font = '16px Arial';
      pageData.components.forEach((comp, index) => {
        ctx.fillText(comp, 50, 360 + (index * 30));
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${selectedPage}.png`;
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      
      toast.success("تم تنزيل الصورة بنجاح");
    } catch (error) {
      console.error('Error creating PNG:', error);
      toast.error("حدث خطأ أثناء إنشاء الصورة");
    }
  };

  const handleDownloadAsPdf = async () => {
    if (!selectedPage) {
      toast.error("الرجاء اختيار صفحة أولاً");
      return;
    }
    
    try {
      setIsGeneratingPdf(true);
      toast.info("جاري إنشاء ملف PDF... قد يستغرق هذا بضع ثوانٍ");
      
      const pageData = pages.find(page => page.id === selectedPage);
      if (!pageData) return;
      
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.width = '1200px';
      iframe.style.height = '1600px';
      document.body.appendChild(iframe);
      
      const baseUrl = window.location.origin;
      iframe.src = `${baseUrl}/${pageData.route}`;
      
      iframe.onload = async () => {
        try {
          setTimeout(async () => {
            const iframeContent = iframe.contentDocument || iframe.contentWindow?.document;
            
            if (!iframeContent) {
              throw new Error("Could not access iframe content");
            }
            
            const images = iframeContent.querySelectorAll('img');
            images.forEach((img: HTMLImageElement) => {
              if (img.src.startsWith('/')) {
                img.src = `${baseUrl}${img.src}`;
              }
              img.setAttribute('data-html2canvas-ignore', 'false');
              img.style.visibility = 'visible';
            });
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const options = {
              margin: 10,
              filename: `${selectedPage}.pdf`,
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { 
                scale: 2, 
                useCORS: true, 
                allowTaint: true,
                letterRendering: true,
                logging: true,
                imageTimeout: 15000,
                ignoreElements: (element: Element) => {
                  return false;
                }
              },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            const clonedBody = iframeContent.body.cloneNode(true) as HTMLElement;
            
            clonedBody.style.width = '1200px';
            clonedBody.style.margin = '0';
            clonedBody.style.padding = '0';
            
            html2pdf().from(clonedBody).set(options).save().then(() => {
              document.body.removeChild(iframe);
              setIsGeneratingPdf(false);
              toast.success("تم تنزيل ملف PDF بنجاح");
            }).catch((err: any) => {
              console.error('Error saving PDF:', err);
              document.body.removeChild(iframe);
              setIsGeneratingPdf(false);
              toast.error("حدث خطأ أثناء حفظ ملف PDF");
            });
          }, 2500);
        } catch (error) {
          console.error('Error creating PDF:', error);
          document.body.removeChild(iframe);
          setIsGeneratingPdf(false);
          toast.error("حدث خطأ أثناء إنشاء ملف PDF");
        }
      };
      
      iframe.onerror = () => {
        document.body.removeChild(iframe);
        setIsGeneratingPdf(false);
        toast.error("تعذر تحميل الصفحة لإنشاء PDF");
      };
      
    } catch (error) {
      console.error('Error setting up PDF creation:', error);
      setIsGeneratingPdf(false);
      toast.error("حدث خطأ أثناء إعداد عملية إنشاء PDF");
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
            
            <div className="flex flex-col gap-3">
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
              
              <Button 
                onClick={handleDownloadAsPdf} 
                className="w-full bg-red-600 hover:bg-red-700" 
                disabled={!selectedPage || isGeneratingPdf}
              >
                {isGeneratingPdf ? (
                  <>
                    <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    جاري إنشاء PDF...
                  </>
                ) : (
                  <>
                    <FileText className="ml-2" size={16} />
                    تنزيل كملف PDF مع التصميم
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
