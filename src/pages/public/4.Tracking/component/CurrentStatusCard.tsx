import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import type { ParcelStatus } from '@/types';

interface CurrentStatusCardProps {
    status: string;
    deliveryDate: Date;
    progressPercentage: number;
}

const CurrentStatusCard = ({ status, deliveryDate, progressPercentage }: CurrentStatusCardProps) => {
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-primary">Current Status</CardTitle>
                    <StatusBadge status={status as ParcelStatus} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-card-foreground">Delivery Progress</span>
                            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                            <div
                                className="bg-primary h-3 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Estimated Delivery */}
                    <div className="bg-primary/5 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                                <p className="font-semibold text-card-foreground">
                                    {new Date(deliveryDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CurrentStatusCard;