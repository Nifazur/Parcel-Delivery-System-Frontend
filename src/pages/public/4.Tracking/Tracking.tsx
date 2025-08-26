import { useParams } from 'react-router-dom';
import { useTrackParcelQuery } from '@/redux/features/parcelApi';
import { Button } from '@/components/ui/button';
import { Download, Phone } from 'lucide-react';
import AddressesCard from './component/AddressCard';
import TrackingTimelineCard from '@/components/parcel/TrackingTimelineCard';
import CurrentStatusCard from './component/CurrentStatusCard';
import TrackingHeader from './component/TrackingHeader';
import ErrorState from './component/ErrorState';

const Tracking = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useTrackParcelQuery(id as string);

    // Loading state
    if (isLoading) {
        // return <LoadingState trackingId={id} />;
        return <h1>loading</h1>
    }

    // Error state
    if (isError || !data?.success) {
        return <ErrorState message={data?.message} trackingId={id} />;
    }

    // Extract data from API response
    const parcelData = data.data;

    const getProgressPercentage = () => {
        const statusOrder = ['requested', 'approved', 'dispatched', 'in_transit', 'delivered'];
        const currentIndex = statusOrder.indexOf(parcelData.status as string);
        return ((currentIndex + 1) / statusOrder.length) * 100;
    };

    return (
        <div className="min-h-screen bg-background">
            <TrackingHeader trackingId={parcelData.trackingId as string} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Tracking Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <CurrentStatusCard
                            status={parcelData.status as string}
                            deliveryDate={parcelData.deliveryDate as Date}
                            progressPercentage={getProgressPercentage()}
                        />

                        <TrackingTimelineCard
                            currentStatus={parcelData.status as string}
                            fromAddress={parcelData.fromAddress}
                            toAddress={parcelData.toAddress}
                            deliveryDate={parcelData.deliveryDate as Date}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <AddressesCard
                            fromAddress={parcelData.fromAddress}
                            toAddress={parcelData.toAddress}
                        />

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