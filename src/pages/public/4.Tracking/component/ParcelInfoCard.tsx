import { Package, Weight, Calendar, MapPin, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import type { ParcelStatus } from '@/types';

interface ParcelInfoCardProps {
    type: string;
    weight: number;
    status: string;
    division: string;
    fee: number;
    createdAt: Date;
}



const ParcelInfoCard = ({ 
    type, 
    weight, 
    status, 
    division, 
    fee, 
    createdAt 
}: ParcelInfoCardProps) => {
    const deliveryDate = new Date(createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-primary">Parcel Information</CardTitle>
                    <StatusBadge status={status as ParcelStatus} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Type */}
                    <div className="bg-primary/5 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Type</p>
                                <p className="font-semibold text-card-foreground">
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Weight */}
                    <div className="bg-primary/5 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <Weight className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Weight</p>
                                <p className="font-semibold text-card-foreground">{weight} kg</p>
                            </div>
                        </div>
                    </div>

                    {/* Division */}
                    <div className="bg-primary/5 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Division</p>
                                <p className="font-semibold text-card-foreground">{division}</p>
                            </div>
                        </div>
                    </div>

                    {/* Fee */}
                    <div className="bg-primary/5 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Fee</p>
                                <p className="font-semibold text-card-foreground">৳{fee}</p>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Date */}
                    <div className="bg-primary/5 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Delivery Date</p>
                                <p className="font-semibold text-card-foreground">
                                    {new Date(deliveryDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Created Date */}
                    <div className="bg-primary/5 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Created</p>
                                <p className="font-semibold text-card-foreground">
                                    {new Date(createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ParcelInfoCard;