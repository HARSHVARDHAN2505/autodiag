
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info, Bell } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const VehicleDetails = () => {
  // Mock vehicle data
  const vehicle = {
    name: "Tanish Khan",
    model: "Fortuner GR",
    licensePlate: "RJ 09 AB 1234",
    productionDate: "2019",
    engine: "BS-6",
    bodyType: "SUV",
    lastService: "10/03/2023",
    nextService: "10/09/2023"
  };
  
  return (
    <motion.div
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full">
            <Info size={20} />
          </button>
          <h2 className="text-lg font-medium">Details</h2>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full">
          <Bell size={20} />
        </button>
      </motion.div>
      
      {/* Vehicle Image */}
      <motion.div 
        variants={itemVariants} 
        className="bg-zinc-800/30 rounded-lg p-4 flex items-center justify-center"
      >
        <img 
          src="/lovable-uploads/70d8bfa9-7bcd-41f7-8b3f-d9078569dadd.png" 
          alt="Vehicle" 
          className="h-40 object-contain"
        />
      </motion.div>
      
      <motion.div variants={itemVariants} className="text-center mt-2">
        <h3 className="text-xl font-bold">{vehicle.model}</h3>
        <p className="text-diag-muted text-sm">{vehicle.licensePlate}</p>
      </motion.div>
      
      {/* Vehicle Information */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg">
          <CardContent className="p-4 space-y-3">
            <div className="space-y-3">
              <div className="bg-diag-dark/70 rounded-lg p-4">
                <p className="text-diag-muted text-sm mb-1">Name</p>
                <p className="font-medium">{vehicle.name}</p>
              </div>
              
              <div className="bg-diag-dark/70 rounded-lg p-4">
                <p className="text-diag-muted text-sm mb-1">Production Date</p>
                <p className="font-medium">{vehicle.productionDate}</p>
              </div>
              
              <div className="bg-diag-dark/70 rounded-lg p-4">
                <p className="text-diag-muted text-sm mb-1">Engine</p>
                <p className="font-medium">{vehicle.engine}</p>
              </div>
              
              <div className="bg-diag-dark/70 rounded-lg p-4">
                <p className="text-diag-muted text-sm mb-1">Body Type</p>
                <p className="font-medium">{vehicle.bodyType}</p>
              </div>
              
              <div className="bg-diag-dark/70 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-diag-muted text-sm mb-1">Image</p>
                  <p className="font-medium flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M21 14H3M18 9h1M14 4h-4l-2 5m4 12l2-5M3 8h.01M3 12h.01M3 16h.01M3 20h.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Attachment
                  </p>
                </div>
                <button className="bg-zinc-700 rounded-lg px-3 py-1 text-xs">
                  View
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Service Information */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg mt-4">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Service Information</h3>
            <div className="space-y-3">
              <div className="bg-diag-dark/70 rounded-lg p-4">
                <p className="text-diag-muted text-sm mb-1">Last Service</p>
                <p className="font-medium">{vehicle.lastService}</p>
              </div>
              
              <div className="bg-diag-dark/70 rounded-lg p-4">
                <p className="text-diag-muted text-sm mb-1">Next Service Due</p>
                <p className="font-medium text-diag-accent">{vehicle.nextService}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default VehicleDetails;
