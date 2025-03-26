
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bell, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for vehicle status
  const vehicleStatus = {
    engineRpm: 2500,
    temperature: 82,
    oilLevel: 85,
    batteryVoltage: 12.6
  };
  
  const diagnosticResults = [
    { 
      system: 'Engine Performance', 
      status: 'normal', 
      message: 'Operating within normal parameters'
    },
    { 
      system: 'Brake System', 
      status: 'warning', 
      message: 'Brake pad replacement recommended'
    }
  ];
  
  return (
    <motion.div
      className="space-y-6 pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">AUTO diag+</h1>
        <div className="flex space-x-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full">
            <Bell size={20} />
          </button>
          <div className="w-8 h-8 bg-zinc-700 rounded-full overflow-hidden">
            <img 
              src="https://i.pravatar.cc/150?img=32" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
      
      {/* Vehicle Status Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Vehicle Status</CardTitle>
              <span className="text-xs text-diag-muted">Real-time</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-diag-dark/50 rounded-lg p-3 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <p className="text-diag-muted text-xs">Engine Speed</p>
                  <p className="font-medium">{vehicleStatus.engineRpm} RPM</p>
                </div>
              </div>
              
              <div className="bg-diag-dark/50 rounded-lg p-3 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 4v12a2 2 0 1 1-4 0V4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4 10a8 8 0 1 1 16 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-diag-muted text-xs">Temperature</p>
                  <p className="font-medium">{vehicleStatus.temperature}°C</p>
                </div>
              </div>
              
              <div className="bg-diag-dark/50 rounded-lg p-3 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10h18M9 16h6M12 3v18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-diag-muted text-xs">Oil Level</p>
                  <p className="font-medium">{vehicleStatus.oilLevel}%</p>
                </div>
              </div>
              
              <div className="bg-diag-dark/50 rounded-lg p-3 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 7h-4v10h4M7 10h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-diag-muted text-xs">Battery</p>
                  <p className="font-medium">{vehicleStatus.batteryVoltage}V</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Diagnostic Results */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">AI Diagnostic Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {diagnosticResults.map((result, index) => (
              <div 
                key={index} 
                className="p-3 rounded-lg bg-diag-dark/50 flex items-center space-x-3"
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  result.status === 'normal' ? "bg-green-900/30" : "bg-amber-900/30"
                )}>
                  {result.status === 'normal' ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <AlertTriangle size={18} className="text-amber-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{result.system}</p>
                  <p className="text-diag-muted text-xs">{result.message}</p>
                </div>
              </div>
            ))}
            
            <Button 
              variant="secondary"
              className="w-full mt-3 bg-diag-dark/70 hover:bg-diag-dark border border-zinc-800 text-sm"
              onClick={() => navigate('/scan')}
            >
              Scan for new issues
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Mechanic Info */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Assigned Mechanic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-zinc-700 rounded-full overflow-hidden">
                <img 
                  src="https://i.pravatar.cc/150?img=55" 
                  alt="John Smith" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-diag-muted text-xs">Senior Mechanic</p>
              </div>
              <div className="ml-auto flex space-x-2">
                <button className="w-10 h-10 bg-diag-dark/70 rounded-full flex items-center justify-center border border-zinc-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-diag-dark/70 rounded-full flex items-center justify-center border border-zinc-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
