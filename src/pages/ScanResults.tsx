
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertTriangle, HelpCircle, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface DetectedDamage {
  id: string;
  name: string;
  description: string;
  repairSuggestion: string;
  severity: 'low' | 'medium' | 'high';
  estimatedCost: string;
}

interface ScanResult {
  scanId: string;
  timestamp: string;
  imageUrl: string;
  detectedDamages: DetectedDamage[];
  confidence: number;
}

const SeverityIcon = ({ severity }: { severity: string }) => {
  switch (severity) {
    case 'low':
      return <CheckCircle size={18} className="text-green-500" />;
    case 'medium':
      return <AlertTriangle size={18} className="text-amber-500" />;
    case 'high':
      return <AlertTriangle size={18} className="text-diag-accent" />;
    default:
      return <HelpCircle size={18} className="text-zinc-500" />;
  }
};

const ScanResults = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load scan result from local storage
    const loadScanResult = () => {
      setLoading(true);
      try {
        const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
        const result = history.find((item: ScanResult) => item.scanId === scanId);
        
        if (result) {
          setScanResult(result);
        } else {
          toast({
            title: "Scan not found",
            description: "The requested scan could not be found",
            variant: "destructive"
          });
          navigate('/scan');
        }
      } catch (error) {
        console.error("Error loading scan result:", error);
        toast({
          title: "Error loading results",
          description: "There was a problem loading the scan results",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadScanResult();
  }, [scanId, navigate, toast]);
  
  const handleShareResults = () => {
    // In a real app, this would implement sharing functionality
    toast({
      title: "Share functionality",
      description: "This would share the results via email or messaging apps",
    });
  };
  
  const handleDownloadReport = () => {
    // In a real app, this would generate and download a PDF report
    toast({
      title: "Download initiated",
      description: "Your diagnostic report is being generated",
    });
  };
  
  // Format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-diag-accent border-t-transparent animate-spin" />
          <p className="text-diag-muted">Loading scan results...</p>
        </div>
      </div>
    );
  }
  
  if (!scanResult) return null;
  
  return (
    <motion.div
      className="space-y-6 pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center mb-2">
        <button 
          onClick={() => navigate('/scan')}
          className="mr-2"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Diagnostic Results</h1>
      </motion.div>
      
      {/* Image and timestamp */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video w-full relative">
              <img 
                src={scanResult.imageUrl} 
                alt="Analyzed image" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-zinc-300">Scan completed</p>
                    <p className="text-sm font-medium">{formatDate(scanResult.timestamp)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-300">Confidence</p>
                    <p className="text-sm font-medium">{scanResult.confidence}%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Analysis results */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Detected Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {scanResult.detectedDamages.length > 0 ? (
              scanResult.detectedDamages.map((damage, index) => (
                <div key={index} className="bg-diag-dark/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      damage.severity === 'low' ? "bg-green-900/30" : 
                      damage.severity === 'medium' ? "bg-amber-900/30" : "bg-red-900/30"
                    )}>
                      <SeverityIcon severity={damage.severity} />
                    </div>
                    <div>
                      <p className="font-medium">{damage.name}</p>
                      <p className="text-diag-muted text-xs">Severity: {damage.severity}</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-zinc-800/50" />
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-diag-muted">Description</p>
                      <p className="text-sm">{damage.description}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-diag-muted">Recommended Fix</p>
                      <p className="text-sm">{damage.repairSuggestion}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-diag-muted">Estimated Cost</p>
                      <p className="text-sm font-medium">{damage.estimatedCost}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-6">
                <CheckCircle size={40} className="text-green-500 mx-auto mb-2" />
                <p className="font-medium">No issues detected</p>
                <p className="text-diag-muted text-sm">Your vehicle appears to be in good condition</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Action buttons */}
      <motion.div variants={itemVariants} className="flex space-x-4">
        <Button
          variant="outline" 
          className="flex-1 h-12 bg-diag-dark/70 hover:bg-diag-dark border border-zinc-800"
          onClick={handleShareResults}
        >
          <Share2 size={16} className="mr-2" />
          Share
        </Button>
        
        <Button
          className="flex-1 h-12 bg-diag-accent hover:bg-diag-accent/90 text-white"
          onClick={handleDownloadReport}
        >
          <Download size={16} className="mr-2" />
          Export Report
        </Button>
      </motion.div>
      
      {/* Next steps */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 pl-1">
              <li className="flex items-center space-x-2 text-sm">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-zinc-800 text-xs">1</div>
                <span>Schedule a service appointment with a certified mechanic</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-zinc-800 text-xs">2</div>
                <span>Share diagnostic report with your service provider</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-zinc-800 text-xs">3</div>
                <span>Consider getting multiple quotes for complex repairs</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ScanResults;
