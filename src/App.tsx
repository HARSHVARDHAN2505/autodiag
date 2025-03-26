
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { NavigationProvider } from "./context/NavigationContext";

// Pages
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import ScanUpload from "./pages/ScanUpload";
import ScanResults from "./pages/ScanResults";
import VehicleDetails from "./pages/VehicleDetails";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import DiagnosticDetails from "./pages/DiagnosticDetails";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NavigationProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/scan" element={<ScanUpload />} />
                <Route path="/results/:scanId" element={<ScanResults />} />
                <Route path="/vehicle" element={<VehicleDetails />} />
                <Route path="/history" element={<History />} />
                <Route path="/diagnostic/:id" element={<DiagnosticDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </NavigationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
