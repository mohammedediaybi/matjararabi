
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EmailLanding from "./pages/EmailLanding";
import OrderConfirmation from "./pages/OrderConfirmation";
import DownloadJson from "./pages/DownloadJson";
import NotFound from "./pages/NotFound";
import ProductTextEditor from "./pages/ProductTextEditor";
import TrimMasterLanding from "./pages/TrimMasterLanding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/email-landing" replace />} />
          <Route path="/email-landing" element={<EmailLanding />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/download-json" element={<DownloadJson />} />
          <Route path="/product-text-editor" element={<ProductTextEditor />} />
          <Route path="/trim-master" element={<TrimMasterLanding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
