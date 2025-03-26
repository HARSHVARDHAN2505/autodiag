import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Welcome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleStart = () => {
    setLoading(true);
    
    // Simulate app initialization
    setTimeout(() => {
      toast({
        title: "Welcome to AutoDiag+",
        description: "Your smart diagnostic tool is ready",
      });
      navigate('/dashboard');
    }, 1000);
  };
  
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/925a323e-da6f-4ae3-bacd-b54cf07f6cde.png" 
          alt="Car" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-screen px-6 py-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Diagnose, Analyze<br />and Fix-faster
          </h1>
          <p className="text-zinc-300 mb-8">
            Get proper and smarter solutions regarding<br />
            your vehicles related issues.
          </p>
          
          <Button 
            onClick={handleStart}
            className="w-full h-14 rounded-full text-base font-medium bg-white text-black hover:bg-zinc-200 transition-all"
            disabled={loading}
          >
            {loading ? "Loading..." : "Let's Go"}
          </Button>
        </motion.div>
      </div>
      
      {/* App version indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="w-20 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
};

export default Welcome;
