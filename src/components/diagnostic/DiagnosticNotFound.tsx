
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const DiagnosticNotFound = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full p-4 text-center"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <AlertTriangle size={48} className="text-amber-500 mb-4" />
      <h1 className="text-xl font-bold mb-2">Diagnostic Not Found</h1>
      <p className="text-diag-muted mb-6">The diagnostic information you're looking for couldn't be found.</p>
      <Button onClick={handleBack}>Return to Dashboard</Button>
    </motion.div>
  );
};

export default DiagnosticNotFound;
