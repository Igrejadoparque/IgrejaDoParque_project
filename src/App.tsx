import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LeadershipPage from "@/components/pages/LeadershipPage";
import AboutPage from "@/components/pages/AboutPage";
import PublicationsPage from "@/components/pages/PublicationsPage";
import WebTVPage from "@/components/pages/WebTVPage";
import EventsPage from "@/components/pages/EventsPage";
import ContactPage from "@/components/pages/ContactPage";
import DepartmentsPage from "@/components/pages/DepartmentsPage";
import DevotionalPage from "./pages/DevotionalPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lideranca" element={<LeadershipPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/publicacoes" element={<PublicationsPage />} />
          <Route path="/webtv" element={<WebTVPage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/departamentos" element={<DepartmentsPage />} />
          <Route path="/devocional" element={<DevotionalPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


