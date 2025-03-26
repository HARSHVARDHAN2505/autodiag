
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigation } from "@/context/NavigationContext";
import Footer from "./Footer";
import { cn } from "@/lib/utils";
import { Bell, Home, Car, Camera, History, User } from "lucide-react";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setPreviousPage } = useNavigation();
  
  // Track active route for navigation highlighting
  const [activeRoute, setActiveRoute] = useState<string>("/dashboard");
  
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);
  
  // Handle navigation with route tracking
  const handleNavigation = (route: string) => {
    setPreviousPage(location.pathname);
    navigate(route);
  };
  
  // Page transition animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-diag-dark overflow-hidden">
      {/* Status bar simulation */}
      <div className="h-6 bg-black w-full flex items-center justify-between px-4 text-xs text-white">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2.5 bg-white rounded-sm"></div>
          <div className="w-4 h-2.5 bg-white rounded-sm"></div>
          <div className="w-4 h-2.5 bg-white rounded-sm"></div>
        </div>
      </div>
      
      {/* Main content area */}
      <motion.main 
        className="flex-1 p-4 pb-20 overflow-auto" 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Outlet />
      </motion.main>
      
      {/* Footer navigation */}
      <Footer activeRoute={activeRoute} onNavigate={handleNavigation} />
    </div>
  );
};

export default Layout;
