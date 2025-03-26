import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigation } from "@/context/NavigationContext";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setPreviousPage } = useNavigation();
  
  const [activeRoute, setActiveRoute] = useState<string>("/dashboard");
  
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);
  
  const handleNavigation = (route: string) => {
    setPreviousPage(location.pathname);
    navigate(route);
  };
  
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
      <motion.main 
        className="flex-1 p-4 pb-20 overflow-auto" 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Outlet />
      </motion.main>
      
      <Footer activeRoute={activeRoute} onNavigate={handleNavigation} />
    </div>
  );
};

export default Layout;
