
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info, Bell, AlertTriangle, CheckCircle, Thermometer, Gauge, Wind, Droplet, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
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

  // Mock sensor readings
  const sensorReadings = [
    { 
      id: 'temp-sensor',
      name: 'Temperature Sensor', 
      icon: <Thermometer size={18} />,
      reading: '92°C', 
      status: 'warning',
      suggestion: 'Engine temperature slightly elevated. Consider checking coolant levels.'
    },
    { 
      id: 'accelerometer',
      name: 'Accelerometer', 
      icon: <Gauge size={18} />, 
      reading: '0.87 G', 
      status: 'normal',
      suggestion: 'Acceleration rates within normal parameters.'
    },
    { 
      id: 'pressure-sensor',
      name: 'Pressure Sensor', 
      icon: <Gauge size={18} />, 
      reading: '34.2 PSI', 
      status: 'normal',
      suggestion: 'System pressure normal.'
    },
    { 
      id: 'dual-axis',
      name: 'Dual Axis Sensor', 
      icon: <Compass size={18} />, 
      reading: 'X: 2.3° | Y: 1.7°', 
      status: 'normal',
      suggestion: 'Vehicle alignment is within specification.'
    },
    { 
      id: 'tire-sensor',
      name: 'Tire Sensors', 
      icon: <Gauge size={18} />, 
      reading: 'FL: 30 | FR: 31 | RL: 29 | RR: 29 PSI', 
      status: 'normal',
      suggestion: 'All tire pressures within recommended range.'
    },
    { 
      id: 'pitot-tube',
      name: 'Pitot Tubes', 
      icon: <Wind size={18} />, 
      reading: '142 kPa', 
      status: 'warning',
      suggestion: 'Air flow measurements indicate possible air filter restriction.'
    },
    { 
      id: 'fluid-flow',
      name: 'Ultrasonic Fluid Flow', 
      icon: <Droplet size={18} />, 
      reading: '12.3 L/min', 
      status: 'error',
      suggestion: 'Fuel flow rate below threshold. Check fuel pump and filter.'
    },
    { 
      id: 'damper',
      name: 'Damper Potentiometers', 
      icon: <Gauge size={18} />, 
      reading: 'FL: 5.7V | FR: 5.6V | RL: 3.2V | RR: 5.8V', 
      status: 'warning',
      suggestion: 'Rear left suspension damper shows abnormal values. Inspection recommended.'
    }
  ];
  
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
      
      {/* Vehicle Model Name */}
      <motion.div variants={itemVariants} className="text-center mt-2">
        <h3 className="text-xl font-bold">{vehicle.model}</h3>
        <p className="text-diag-muted text-sm">{vehicle.licensePlate}</p>
      </motion.div>
      
      {/* Sensor Readings */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Sensor Readings</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {sensorReadings.map((sensor) => (
              <div 
                key={sensor.id}
                className={cn(
                  "bg-diag-dark/70 rounded-lg p-4 flex items-center justify-between",
                  sensor.status === 'warning' && "border border-amber-900/30",
                  sensor.status === 'error' && "border border-red-900/30"
                )}
                onClick={() => navigate(`/diagnostic/${sensor.id}`)}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    sensor.status === 'normal' && "bg-zinc-800",
                    sensor.status === 'warning' && "bg-amber-900/30",
                    sensor.status === 'error' && "bg-red-900/30"
                  )}>
                    {sensor.icon}
                  </div>
                  <div>
                    <p className="font-medium">{sensor.name}</p>
                    <p className="text-diag-muted text-xs">Current reading</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-medium",
                    sensor.status === 'warning' && "text-amber-500",
                    sensor.status === 'error' && "text-red-500"
                  )}>
                    {sensor.reading}
                  </p>
                  <div className="flex items-center space-x-1 text-xs">
                    {sensor.status === 'normal' ? (
                      <CheckCircle size={12} className="text-green-500" />
                    ) : sensor.status === 'warning' ? (
                      <AlertTriangle size={12} className="text-amber-500" />
                    ) : (
                      <AlertTriangle size={12} className="text-red-500" />
                    )}
                    <span className={cn(
                      sensor.status === 'normal' && "text-green-500",
                      sensor.status === 'warning' && "text-amber-500",
                      sensor.status === 'error' && "text-red-500"
                    )}>
                      {sensor.status === 'normal' ? 'Normal' : sensor.status === 'warning' ? 'Warning' : 'Critical'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Diagnostic Suggestions */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Diagnostic Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {sensorReadings
              .filter(sensor => sensor.status !== 'normal')
              .map((sensor, index) => (
                <div key={index} className={cn(
                  "p-3 rounded-lg bg-diag-dark/70 flex items-start space-x-3",
                  sensor.status === 'warning' && "border border-amber-900/30",
                  sensor.status === 'error' && "border border-red-900/30"
                )}>
                  <div className={cn(
                    "mt-1 p-1 rounded-full",
                    sensor.status === 'warning' && "bg-amber-900/30",
                    sensor.status === 'error' && "bg-red-900/30"
                  )}>
                    <AlertTriangle size={16} className={cn(
                      sensor.status === 'warning' && "text-amber-500",
                      sensor.status === 'error' && "text-red-500"
                    )} />
                  </div>
                  <div>
                    <p className={cn(
                      "font-medium",
                      sensor.status === 'warning' && "text-amber-500",
                      sensor.status === 'error' && "text-red-500"
                    )}>
                      {sensor.name}
                    </p>
                    <p className="text-diag-muted text-sm">{sensor.suggestion}</p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Vehicle Information */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
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
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Service Information */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Service Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="bg-diag-dark/70 rounded-lg p-4">
              <p className="text-diag-muted text-sm mb-1">Last Service</p>
              <p className="font-medium">{vehicle.lastService}</p>
            </div>
            
            <div className="bg-diag-dark/70 rounded-lg p-4">
              <p className="text-diag-muted text-sm mb-1">Next Service Due</p>
              <p className="font-medium text-diag-accent">{vehicle.nextService}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default VehicleDetails;
