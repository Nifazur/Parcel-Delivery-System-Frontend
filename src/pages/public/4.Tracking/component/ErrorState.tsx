import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorStateProps {
    message?: string;
    trackingId?: string;
}

const ErrorState = ({ message, trackingId }: ErrorStateProps) => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <Card className="max-w-md mx-auto p-8 text-center shadow-lg">
                <CardContent className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-red-600">Tracking Not Found</h2>
                    <p className="text-muted-foreground">
                        {message || 'We couldn\'t find any information for this tracking number.'}
                    </p>
                    {trackingId && (
                        <div className="text-sm text-muted-foreground">
                            Tracking: <code className="font-mono bg-muted px-2 py-1 rounded">{trackingId}</code>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ErrorState;