
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WarningCard = () => {
  return (
    <Card className="bg-amber-900/10 border border-amber-900/30 shadow-lg">
      <CardContent className="p-4 flex items-center space-x-3">
        <AlertTriangle size={20} className="text-amber-500 shrink-0" />
        <div>
          <p className="font-medium text-amber-500">Recommended Action</p>
          <p className="text-sm text-diag-muted">Schedule maintenance soon to address the warning issues.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarningCard;
