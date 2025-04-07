
import { Info, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DetailProps {
  name: string;
  value: string;
  status: string;
}

interface DetailedReadingsProps {
  details: DetailProps[];
}

const DetailedReadings = ({ details }: DetailedReadingsProps) => {
  return (
    <Card className="bg-diag-card border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Detailed Readings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {(details || []).map((detail, index) => (
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

        {(!details || details.length === 0) && (
          <div className="p-4 text-center text-diag-muted">
            <Info size={20} className="mx-auto mb-2" />
            <p>No detailed readings available for this system.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailedReadings;
