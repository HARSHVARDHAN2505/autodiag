
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface DiagnosticHeaderProps {
  system: string;
  status: string;
}

const DiagnosticHeader = ({ system, status }: DiagnosticHeaderProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    // Always navigate to dashboard when back button is clicked
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleBack}
        className="h-8 w-8"
      >
        <ArrowLeft size={18} />
      </Button>
      <h1 className="text-xl font-bold">{system}</h1>
      <div className={cn(
        "ml-auto px-2 py-1 rounded-full text-xs font-medium flex items-center",
        status === 'normal' 
          ? "bg-green-900/20 text-green-500" 
          : "bg-amber-900/20 text-amber-500"
      )}>
        {status === 'normal' ? (
          <CheckCircle size={14} className="mr-1" />
        ) : (
          <AlertTriangle size={14} className="mr-1" />
        )}
        {status === 'normal' ? 'Normal' : 'Warning'}
      </div>
    </div>
  );
};

export default DiagnosticHeader;
