import { Clock, CheckCircle, Package, Truck, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import type { ParcelStatus } from '@/types';

interface TrackingEvent {
    id: string;
    status: string;
    description: string;
    location: string;
    timestamp: string;
    isCompleted: boolean;
}

interface TrackingTimelineCardProps {
    currentStatus: string;
    fromAddress?: string;
    toAddress?: string;
    deliveryDate: Date;
}

const TrackingTimelineCard = ({ currentStatus, fromAddress, toAddress, deliveryDate }: TrackingTimelineCardProps) => {
    const createTrackingEvents = (): TrackingEvent[] => {
        const statusOrder = ['requested', 'approved', 'dispatched', 'in_transit', 'delivered'];
        const currentStatusIndex = statusOrder.indexOf(currentStatus);
        
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
                location: 'FastBox Hub',
                timestamp: new Date().toLocaleDateString() + ', 11:15 AM',
                isCompleted: currentStatusIndex >= 1
            },
            {
                id: '3',
                status: 'dispatched',
                description: 'Parcel collected from pickup location',
                location: fromAddress || 'Pickup Location',
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
                location: toAddress || 'Delivery Address',
                timestamp: new Date(deliveryDate).toLocaleDateString() + ', 6:00 PM',
                isCompleted: currentStatusIndex >= 4
            }
        ];

        return events;
    };

    const isStatusActive = (eventStatus: string) => {
        const statusOrder = ['requested', 'approved', 'dispatched', 'in_transit', 'delivered'];
        const currentIndex = statusOrder.indexOf(currentStatus);
        const eventIndex = statusOrder.indexOf(eventStatus);
        return eventIndex <= currentIndex;
    };

    const trackingEvents = createTrackingEvents();

    return (
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
                                            <StatusBadge status={event.status as ParcelStatus} />
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
    );
};

export default TrackingTimelineCard;