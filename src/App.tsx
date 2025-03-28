
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OrderConfirmation from "./pages/OrderConfirmation";
import TrimMasterLanding from "./pages/TrimMasterLanding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/trim-master" replace />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/trim-master" element={<TrimMasterLanding />} />
          <Route path="*" element={<Navigate to="/trim-master" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
