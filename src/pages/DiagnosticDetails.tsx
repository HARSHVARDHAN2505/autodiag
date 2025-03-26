
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/context/NavigationContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const DiagnosticDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { previousPage } = useNavigation();
  
  // Use location state if available, otherwise fallback to mock data based on ID
  const diagnostic = location.state?.diagnostic || getDiagnosticById(id);
  
  // Mock data for different diagnostic systems
  function getDiagnosticById(id) {
    const diagnosticData = {
      'engine-performance': {
        id: 'engine-performance',
        system: 'Engine Performance',
        status: 'normal',
        message: 'Operating within normal parameters',
        details: [
          { name: 'Engine RPM', value: '2500 rpm', status: 'normal' },
          { name: 'Fuel Efficiency', value: '28 mpg', status: 'normal' },
          { name: 'Engine Temperature', value: '82°C', status: 'normal' },
          { name: 'Throttle Response', value: 'Optimal', status: 'normal' },
          { name: 'Air Flow', value: '14.2 g/s', status: 'normal' }
        ],
        description: 'The engine is functioning optimally with all parameters within normal operating ranges. Regular maintenance has been performed according to schedule.'
      },
      'brake-system': {
        id: 'brake-system',
        system: 'Brake System',
        status: 'warning',
        message: 'Brake pad replacement recommended',
        details: [
          { name: 'Front Brake Pads', value: '15% remaining', status: 'warning' },
          { name: 'Rear Brake Pads', value: '42% remaining', status: 'normal' },
          { name: 'Brake Fluid', value: 'Level OK', status: 'normal' },
          { name: 'ABS System', value: 'Functioning', status: 'normal' },
          { name: 'Brake Lines', value: 'No leaks detected', status: 'normal' }
        ],
        description: 'The front brake pads are showing significant wear and should be replaced soon. Estimated life remaining: 1,500 miles. Rear brake pads and other brake components are functioning normally.'
      }
    };
    
    return diagnosticData[id] || {
      id: id || 'unknown',
      system: 'Unknown System',
      status: 'normal',
      message: 'No information available',
      details: [],
      description: 'No detailed information is available for this system.'
    };
  }
  
  const handleBack = () => {
    // Always navigate to dashboard when back button is clicked
    navigate('/dashboard');
  };
  
  // If diagnostic is null or undefined for some reason, provide a fallback
  if (!diagnostic) {
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
  }
  
  return (
    <motion.div
      className="space-y-6 pb-10"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleBack}
          className="h-8 w-8"
        >
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">{diagnostic.system}</h1>
        <div className={cn(
          "ml-auto px-2 py-1 rounded-full text-xs font-medium flex items-center",
          diagnostic.status === 'normal' 
            ? "bg-green-900/20 text-green-500" 
            : "bg-amber-900/20 text-amber-500"
        )}>
          {diagnostic.status === 'normal' ? (
            <CheckCircle size={14} className="mr-1" />
          ) : (
            <AlertTriangle size={14} className="mr-1" />
          )}
          {diagnostic.status === 'normal' ? 'Normal' : 'Warning'}
        </div>
      </div>
      
      <Card className="bg-diag-card border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Diagnostic Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-diag-muted">{diagnostic.description}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-diag-card border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Detailed Readings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(diagnostic.details || []).map((detail, index) => (
            <div 
              key={index}
              className={cn(
                "p-3 rounded-lg bg-diag-dark/50 flex items-center justify-between",
                detail.status === 'warning' && "border border-amber-900/30"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  detail.status === 'normal' ? "bg-zinc-800" : "bg-amber-900/30"
                )}>
                  {detail.status === 'normal' ? (
                    <Info size={16} className="text-zinc-400" />
                  ) : (
                    <AlertTriangle size={16} className="text-amber-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{detail.name}</p>
                  <p className="text-diag-muted text-xs">Current reading</p>
                </div>
              </div>
              <div className={cn(
                "text-right",
                detail.status === 'warning' && "text-amber-500"
              )}>
                <p className="font-medium">{detail.value}</p>
              </div>
            </div>
          ))}

          {(!diagnostic.details || diagnostic.details.length === 0) && (
            <div className="p-4 text-center text-diag-muted">
              <Info size={20} className="mx-auto mb-2" />
              <p>No detailed readings available for this system.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {diagnostic.status === 'warning' && (
        <Card className="bg-amber-900/10 border border-amber-900/30 shadow-lg">
          <CardContent className="p-4 flex items-center space-x-3">
            <AlertTriangle size={20} className="text-amber-500 shrink-0" />
            <div>
              <p className="font-medium text-amber-500">Recommended Action</p>
              <p className="text-sm text-diag-muted">Schedule maintenance soon to address the warning issues.</p>
            </div>
          </CardContent>
        </Card>
      )}
      
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
