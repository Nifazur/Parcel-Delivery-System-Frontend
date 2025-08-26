import { Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TrackingHeaderProps {
    trackingId: string;
}

const TrackingHeader = ({ trackingId }: TrackingHeaderProps) => {
    return (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
                        <Package className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                        Parcel Tracking
                    </h1>
                    <p className="text-muted-foreground">
                        Track your parcel journey in real-time
                    </p>
                </div>

                {/* Tracking Number Display */}
                <Card className="max-w-md mx-auto mb-8 shadow-lg">
                    <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Tracking Number</p>
                        <div className="flex items-center justify-center gap-2">
                            <code className="text-2xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
                                {trackingId}
                            </code>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TrackingHeader;