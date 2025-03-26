
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Upload, ImageIcon, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useNavigation } from '@/context/NavigationContext';

// Dummy database for car damages
const carDamageDatabase = [
  {
    id: 'scratch',
    name: 'Surface Scratch',
    description: 'Light surface damage affecting only the clear coat or paint',
    repairSuggestion: 'Polishing or touch-up paint application',
    severity: 'low',
    estimatedCost: '$100-$300'
  },
  {
    id: 'dent',
    name: 'Minor Dent',
    description: 'Small depression in the panel without paint damage',
    repairSuggestion: 'Paintless dent repair (PDR)',
    severity: 'low',
    estimatedCost: '$150-$400'
  },
  {
    id: 'cracked-bumper',
    name: 'Cracked Bumper',
    description: 'Structural damage to the front or rear bumper',
    repairSuggestion: 'Bumper replacement or plastic welding repair',
    severity: 'medium',
    estimatedCost: '$400-$900'
  },
  {
    id: 'broken-light',
    name: 'Broken Headlight/Taillight',
    description: 'Damage to lighting components',
    repairSuggestion: 'Light assembly replacement',
    severity: 'medium',
    estimatedCost: '$200-$600'
  },
  {
    id: 'windshield-crack',
    name: 'Windshield Crack',
    description: 'Crack or chip in the windshield glass',
    repairSuggestion: 'Glass repair or windshield replacement',
    severity: 'medium',
    estimatedCost: '$300-$1000'
  }
];

// Mock API function for image analysis
const analyzeImage = (imageFile: File) => {
  // In a real app, this would call Google Cloud Vision or similar API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly select 1-2 damages from the database to simulate detection
      const detectedDamages = [];
      const numberOfDamages = Math.floor(Math.random() * 2) + 1;
      
      const availableDamages = [...carDamageDatabase];
      for (let i = 0; i < numberOfDamages; i++) {
        if (availableDamages.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * availableDamages.length);
        detectedDamages.push(availableDamages[randomIndex]);
        availableDamages.splice(randomIndex, 1);
      }
      
      // Generate a unique scan ID
      const scanId = Date.now().toString();
      
      // Create result object with timestamp and detected damages
      const result = {
        scanId,
        timestamp: new Date().toISOString(),
        imageUrl: URL.createObjectURL(imageFile),
        detectedDamages,
        confidence: Math.floor(Math.random() * 30) + 70 // Random confidence between 70-99%
      };
      
      // Store in local storage for history
      const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
      history.push(result);
      localStorage.setItem('scanHistory', JSON.stringify(history));
      
      resolve(result);
    }, 2000); // Simulate API delay
  });
};

const ScanUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCurrentScan } = useNavigation();
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'library' | 'camera' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
    }
  };
  
  // Handle camera capture (simulated in web app)
  const handleCameraCapture = () => {
    // In a mobile app, this would use the device camera
    // For web demo, we'll just trigger the file upload
    setUploadMethod('camera');
    fileInputRef.current?.click();
  };
  
  // Handle image library selection
  const handleImageLibrarySelection = () => {
    setUploadMethod('library');
    fileInputRef.current?.click();
  };
  
  // Clear selected image
  const handleClearImage = () => {
    if (image) URL.revokeObjectURL(image);
    setImage(null);
    setFile(null);
    setUploadMethod(null);
  };
  
  // Process the image
  const handleProcessImage = async () => {
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please select or capture an image first",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Call the mock analysis function
      const result = await analyzeImage(file);
      
      // Set the current scan ID in context
      setCurrentScan((result as any).scanId);
      
      // Show success toast
      toast({
        title: "Analysis complete",
        description: `Detected ${(result as any).detectedDamages.length} issues`,
      });
      
      // Navigate to results page
      navigate(`/results/${(result as any).scanId}`);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
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
  
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold mb-1">Vehicle Scan</h1>
        <p className="text-diag-muted text-sm">Upload or capture an image of the damaged area</p>
      </motion.div>
      
      {/* Image preview area */}
      <motion.div variants={itemVariants}>
        <Card className="bg-diag-card border-none shadow-lg overflow-hidden">
          <CardContent className="p-0 relative">
            {image ? (
              <div className="relative aspect-video w-full">
                <img 
                  src={image} 
                  alt="Selected image" 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={handleClearImage}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="aspect-video w-full flex flex-col items-center justify-center bg-diag-dark/50 p-6">
                <ImageIcon size={48} className="text-zinc-500 mb-4" />
                <p className="text-zinc-400 text-center text-sm">
                  Select an image of the damaged area for analysis
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Upload options */}
      {!image && (
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 gap-4"
        >
          <button
            onClick={handleImageLibrarySelection}
            className="bg-diag-dark/70 border border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 transition-all hover:bg-diag-dark"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-800/70 flex items-center justify-center">
              <Upload size={20} />
            </div>
            <span className="text-sm">Upload Image</span>
          </button>
          
          <button
            onClick={handleCameraCapture}
            className="bg-diag-dark/70 border border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 transition-all hover:bg-diag-dark"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-800/70 flex items-center justify-center">
              <Camera size={20} />
            </div>
            <span className="text-sm">Take Photo</span>
          </button>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </motion.div>
      )}
      
      {/* Process button */}
      {image && (
        <motion.div variants={itemVariants}>
          <Button
            onClick={handleProcessImage}
            disabled={isAnalyzing}
            className="w-full h-12 bg-diag-accent hover:bg-diag-accent/90 text-white"
          >
            {isAnalyzing ? (
              <>
                <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Damage
                <ArrowRight size={16} className="ml-2" />
              </>
            )}
          </Button>
        </motion.div>
      )}
      
      {/* Instructions */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h3 className="text-sm font-medium">For best results:</h3>
        <ul className="text-sm text-diag-muted space-y-1 list-disc list-inside ml-1">
          <li>Ensure good lighting conditions</li>
          <li>Capture the entire damaged area</li>
          <li>Take multiple photos from different angles if needed</li>
          <li>Avoid glare or reflections on the surface</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ScanUpload;
