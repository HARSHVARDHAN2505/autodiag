
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DiagnosticSummaryProps {
  description: string;
}

const DiagnosticSummary = ({ description }: DiagnosticSummaryProps) => {
  return (
    <Card className="bg-diag-card border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Diagnostic Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-diag-muted">{description}</p>
      </CardContent>
    </Card>
  );
};

export default DiagnosticSummary;
