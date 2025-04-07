
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getDiagnosticById } from '@/utils/diagnosticData';
import DiagnosticHeader from '@/components/diagnostic/DiagnosticHeader';
import DiagnosticSummary from '@/components/diagnostic/DiagnosticSummary';
import DetailedReadings from '@/components/diagnostic/DetailedReadings';
import WarningCard from '@/components/diagnostic/WarningCard';
import DiagnosticNotFound from '@/components/diagnostic/DiagnosticNotFound';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const DiagnosticDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use location state if available, otherwise fallback to mock data based on ID
  const diagnostic = location.state?.diagnostic || getDiagnosticById(id);
  
  // If diagnostic is null or undefined for some reason, provide a fallback
  if (!diagnostic) {
    return <DiagnosticNotFound />;
  }
  
  return (
    <motion.div
      className="space-y-6 pb-10"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <DiagnosticHeader system={diagnostic.system} status={diagnostic.status} />
      
      <DiagnosticSummary description={diagnostic.description} />
      
      <DetailedReadings details={diagnostic.details || []} />
      
      {diagnostic.status === 'warning' && <WarningCard />}
      
      <Button 
        className="w-full bg-diag-accent hover:bg-diag-accent/80"
        onClick={() => navigate('/scan')}
      >
        Run New Diagnostic Scan
      </Button>
    </motion.div>
  );
};

export default DiagnosticDetails;
