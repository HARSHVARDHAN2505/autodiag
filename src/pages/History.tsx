
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, ArrowRight, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Define interfaces for scan history
interface DetectedDamage {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
}

interface ScanHistoryItem {
  scanId: string;
  timestamp: string;
  imageUrl: string;
  detectedDamages: DetectedDamage[];
}

const HistoryPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load scan history from local storage
  useEffect(() => {
    setLoading(true);
    try {
      const savedHistory = JSON.parse(localStorage.getItem('scanHistory') || '[]');
      // Sort by timestamp, newest first
      savedHistory.sort((a: ScanHistoryItem, b: ScanHistoryItem) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setHistory(savedHistory);
    } catch (error) {
      console.error('Error loading history:', error);
      toast({
        title: 'Error loading history',
        description: 'There was a problem retrieving your scan history.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);
  
  // View a specific scan result
  const viewScanDetails = (scanId: string) => {
    navigate(`/results/${scanId}`);
  };
  
  // Delete a scan from history
  const deleteScan = (scanId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    try {
      const updatedHistory = history.filter(item => item.scanId !== scanId);
      localStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      
      toast({
        title: 'Scan deleted',
        description: 'The scan has been removed from your history.',
      });
    } catch (error) {
      console.error('Error deleting scan:', error);
      toast({
        title: 'Error deleting scan',
        description: 'There was a problem removing this scan from history.',
        variant: 'destructive',
      });
    }
  };
  
  // Format date nicely
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy • h:mm a');
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };
  
  // Get severity icon
  const getSeverityIcon = (damages: DetectedDamage[]) => {
    if (damages.length === 0) return <CheckCircle size={16} className="text-green-500" />;
    
    const hasCritical = damages.some(d => d.severity === 'high');
    const hasWarning = damages.some(d => d.severity === 'medium');
    
    if (hasCritical) return <AlertTriangle size={16} className="text-diag-accent" />;
    if (hasWarning) return <AlertTriangle size={16} className="text-amber-500" />;
    return <CheckCircle size={16} className="text-green-500" />;
  };
  
  // Get severity text
  const getSeverityText = (damages: DetectedDamage[]) => {
    if (damages.length === 0) return 'No issues found';
    
    const hasCritical = damages.some(d => d.severity === 'high');
    const hasWarning = damages.some(d => d.severity === 'medium');
    
    if (hasCritical) return 'Critical issues found';
    if (hasWarning) return 'Minor issues found';
    return 'Minor issues found';
  };
  
  return (
    <motion.div
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold mb-1">Scan History</h1>
        <p className="text-diag-muted text-sm">View all your previous diagnostic scans</p>
      </motion.div>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-diag-accent animate-spin" />
        </div>
      ) : history.length > 0 ? (
        <motion.div
          className="space-y-4"
          variants={containerVariants}
        >
          {history.map((item) => (
            <motion.div 
              key={item.scanId}
              variants={itemVariants}
              onClick={() => viewScanDetails(item.scanId)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
            >
              <Card className="bg-diag-card border-none shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 h-24 overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt="Scan" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          {getSeverityIcon(item.detectedDamages)}
                          <span className="text-sm font-medium">
                            {getSeverityText(item.detectedDamages)}
                          </span>
                        </div>
                        <p className="text-xs text-diag-muted">
                          {formatDate(item.timestamp)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-diag-muted">
                          {item.detectedDamages.length} {item.detectedDamages.length === 1 ? 'issue' : 'issues'} detected
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => deleteScan(item.scanId, e)}
                            className="p-1 text-diag-muted hover:text-diag-accent transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                          <ArrowRight size={16} className="text-diag-muted" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          variants={itemVariants}
          className="text-center py-12 space-y-3"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-diag-dark/70 flex items-center justify-center border border-zinc-800">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 16v3M19 22v.01M5 8V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3 14a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" stroke="white" strokeWidth="1.5" />
              <path d="M5 14h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-lg font-medium">No scan history yet</h3>
          <p className="text-diag-muted text-sm">
            Your diagnostic scan history will appear here
          </p>
          <Button
            onClick={() => navigate('/scan')}
            className="mt-4 bg-diag-accent hover:bg-diag-accent/90 text-white"
          >
            Perform a New Scan
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HistoryPage;
