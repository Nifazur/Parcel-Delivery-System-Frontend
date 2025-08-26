import { useParams } from 'react-router-dom';
import {
    Package, Truck, MapPin, Clock, CheckCircle, XCircle, AlertCircle, Phone, Calendar, Navigation, Download, Loader2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ParcelDetails } from '@/types';
import { useTrackParcelQuery } from '@/redux/features/parcelApi';

interface StatusBadgeProps {
    status: ParcelDetails['status'];
    isActive?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, isActive = true }) => {
    const statusConfig = {
        requested: {
            variant: 'secondary' as const,
            icon: <Clock className="w-4 h-4" />,
            label: 'Requested',
            className: isActive ? 'bg-gray-100 text-gray-800 border-gray-200' : 'bg-gray-50 text-gray-400 border-gray-100'
        },
        approved: {
            variant: 'secondary' as const,
            icon: <CheckCircle className="w-4 h-4" />,
            label: 'Approved',
            className: isActive ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-50 text-gray-400 border-gray-100'
        },
        dispatched: {
            variant: 'secondary' as const,
            icon: <Package className="w-4 h-4" />,
            label: 'Dispatched',
            className: isActive ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-gray-50 text-gray-400 border-gray-100'
        },
        in_transit: {
            variant: 'secondary' as const,
            icon: <Truck className="w-4 h-4" />,
            label: 'In Transit',
            className: isActive ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-gray-50 text-gray-400 border-gray-100'
        },
        delivered: {
            variant: 'secondary' as const,
            icon: <CheckCircle className="w-4 h-4" />,
            label: 'Delivered',
            className: isActive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-100'
        },
        cancelled: {
            variant: 'destructive' as const,
            icon: <XCircle className="w-4 h-4" />,
            label: 'Cancelled',
            className: isActive ? 'bg-red-100 text-red-800 border-red-200' : 'bg-gray-50 text-gray-400 border-gray-100'
        }
    };

    const config = statusConfig[status];

    return (
        <Badge
            variant={config.variant}
            className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold ${config.className}`}
        >
            {config.icon}
            {config.label}
        </Badge>
    );
};

const Tracking = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useTrackParcelQuery(id as string);

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Card className="max-w-md mx-auto p-8 text-center shadow-lg">
                    <CardContent className="space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                        <h2 className="text-xl font-semibold text-primary">Tracking Your Parcel</h2>
                        <p className="text-muted-foreground">
                            Please wait while we fetch your tracking information...
                        </p>
                        <div className="text-sm text-muted-foreground">
                            Tracking: <code className="font-mono bg-muted px-2 py-1 rounded">{id}</code>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Error state
    if (isError || !data?.success) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Card className="max-w-md mx-auto p-8 text-center shadow-lg">
                    <CardContent className="space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-red-600">Tracking Not Found</h2>
                        <p className="text-muted-foreground">
                            {data?.message || 'We couldn\'t find any information for this tracking number.'}
                        </p>
                        {id && (
                            <div className="text-sm text-muted-foreground">
                                Tracking: <code className="font-mono bg-muted px-2 py-1 rounded">{id}</code>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Extract data from API response
    const parcelData = data.data;

    // Create tracking events based on status progression
    const createTrackingEvents = () => {
        const statusOrder = ['requested', 'approved', 'dispatched', 'in_transit', 'delivered'];
        const currentStatusIndex = statusOrder.indexOf(parcelData.status as string);
        
        const events = [
            {
                id: '1',
                status: 'requested',
                description: 'Parcel pickup requested by sender',
                location: 'Online Portal',
                timestamp: new Date().toLocaleDateString() + ', 10:30 AM',
                isCompleted: currentStatusIndex >= 0
            },
            {
                id: '2',
                status: 'approved',
                description: 'Pickup request approved and scheduled',
                location: 'SwiftDelivery Hub',
                timestamp: new Date().toLocaleDateString() + ', 11:15 AM',
                isCompleted: currentStatusIndex >= 1
            },
            {
                id: '3',
                status: 'dispatched',
                description: 'Parcel collected from pickup location',
                location: parcelData.fromAddress || 'Pickup Location',
                timestamp: new Date().toLocaleDateString() + ', 2:45 PM',
                isCompleted: currentStatusIndex >= 2
            },
            {
                id: '4',
                status: 'in_transit',
                description: 'Parcel is on the way to destination',
                location: 'Transit Hub',
                timestamp: new Date().toLocaleDateString() + ', 4:20 PM',
                isCompleted: currentStatusIndex >= 3
            },
            {
                id: '5',
                status: 'delivered',
                description: 'Parcel delivered to recipient',
                location: parcelData.toAddress || 'Delivery Address',
                timestamp: new Date(parcelData.deliveryDate as Date).toLocaleDateString() + ', 6:00 PM',
                isCompleted: currentStatusIndex >= 4
            }
        ];

        return events;
    };

    const trackingEvents = createTrackingEvents();

    const getProgressPercentage = () => {
        const statusOrder = ['requested', 'approved', 'dispatched', 'in_transit', 'delivered'];
        const currentIndex = statusOrder.indexOf(parcelData.status as string);
        return ((currentIndex + 1) / statusOrder.length) * 100;
    };

    // Helper function to determine if a status should be active/colored
    const isStatusActive = (eventStatus: string) => {
        const statusOrder = ['requested', 'approved', 'dispatched', 'in_transit', 'delivered'];
        const currentIndex = statusOrder.indexOf(parcelData.status as string);
        const eventIndex = statusOrder.indexOf(eventStatus);
        return eventIndex <= currentIndex;
    };

    return (
        <div className="min-h-screen bg-background">
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
                                    {parcelData.trackingId}
                                </code>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Tracking Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Current Status */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl text-primary">Current Status</CardTitle>
                                    <StatusBadge status={parcelData.status as string} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Progress Bar */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-card-foreground">Delivery Progress</span>
                                            <span className="text-sm text-muted-foreground">{Math.round(getProgressPercentage())}%</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-3">
                                            <div
                                                className="bg-primary h-3 rounded-full transition-all duration-500"
                                                style={{ width: `${getProgressPercentage()}%` }}
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
                                                    {new Date(parcelData.deliveryDate as Date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tracking Timeline */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">Tracking History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {trackingEvents.map((event, index) => {
                                        const isActive = isStatusActive(event.status);
                                        
                                        return (
                                            <div key={event.id} className="relative">
                                                {/* Timeline Line */}
                                                {index < trackingEvents.length - 1 && (
                                                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
                                                )}

                                                <div className="flex items-start gap-4">
                                                    {/* Status Icon */}
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                                                        isActive
                                                            ? 'bg-primary border-primary text-primary-foreground'
                                                            : 'bg-background border-border text-muted-foreground'
                                                    }`}>
                                                        {event.status === 'requested' && <Clock className="w-5 h-5" />}
                                                        {event.status === 'approved' && <CheckCircle className="w-5 h-5" />}
                                                        {event.status === 'dispatched' && <Package className="w-5 h-5" />}
                                                        {event.status === 'in_transit' && <Truck className="w-5 h-5" />}
                                                        {event.status === 'delivered' && <CheckCircle className="w-5 h-5" />}
                                                    </div>

                                                    {/* Event Details */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <StatusBadge 
                                                                status={event.status as ParcelDetails['status']} 
                                                                isActive={isActive}
                                                            />
                                                            <span className={`text-sm ${isActive ? 'text-muted-foreground' : 'text-gray-400'}`}>
                                                                {event.timestamp}
                                                            </span>
                                                        </div>
                                                        <p className={`font-semibold mb-1 ${isActive ? 'text-card-foreground' : 'text-gray-400'}`}>
                                                            {event.description}
                                                        </p>
                                                        <div className={`flex items-center gap-1 text-sm ${isActive ? 'text-muted-foreground' : 'text-gray-400'}`}>
                                                            <MapPin className="w-4 h-4" />
                                                            {event.location}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Addresses */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-lg text-primary">Addresses</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm font-semibold text-card-foreground mb-2 flex items-center gap-2">
                                        <Navigation className="w-4 h-4" />
                                        Pickup Address
                                    </p>
                                    <p className="text-sm text-muted-foreground pl-6">{parcelData.fromAddress}</p>
                                </div>

                                <div className="border-t pt-4">
                                    <p className="text-sm font-semibold text-card-foreground mb-2 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Delivery Address
                                    </p>
                                    <p className="text-sm text-muted-foreground pl-6">{parcelData.toAddress}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Button className="w-full rounded-xl" size="lg">
                                <Download className="w-4 h-4 mr-2" />
                                Download Receipt
                            </Button>
                            <Button variant="outline" className="w-full rounded-xl" size="lg">
                                <Phone className="w-4 h-4 mr-2" />
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracking;