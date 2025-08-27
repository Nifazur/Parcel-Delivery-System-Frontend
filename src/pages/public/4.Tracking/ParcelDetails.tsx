import ErrorState from "./component/ErrorState";
import CurrentStatusCard from "./component/CurrentStatusCard";
import AddressesCard from "./component/AddressCard";
import ParcelInfoCard from "./component/ParcelInfoCard";
import { useGetParcelByIdQuery } from "@/redux/features/parcelApi";
import { useParams } from "react-router";
import PeopleInfoCard from "./component/PeopleInfoCard";
import type { IParcelDetails } from "@/types/parcel.type";
import TrackingHeader from "./component/TrackingHeader";
import TrackingTimelineCard from "@/components/parcel/TrackingTimelineCard";
import LoadingPage from "@/components/layout/loading";




const ParcelDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetParcelByIdQuery(id as string);

    // Loading state
    if (isLoading) {
        return <LoadingPage></LoadingPage>;
    }

    // Error state
    if (isError || !data?.success) {
        return <ErrorState message={data?.message} trackingId={id} />;
    }

    // Extract data from API response
    const parcelData: IParcelDetails = data.data;

    const getProgressPercentage = () => {
        const statusOrder = ['requested', 'approved', 'dispatched', 'in_transit', 'delivered'];
        const currentIndex = statusOrder.indexOf(parcelData.status as string);
        return ((currentIndex + 1) / statusOrder.length) * 100;
    };
    const deliveryDate = new Date(parcelData.createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    return (
        <div className="min-h-screen bg-background">
            <TrackingHeader
                trackingId={parcelData.trackingId}
            />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="xl:col-span-3 space-y-6">
                        {/* Parcel Basic Information */}
                        <ParcelInfoCard 
                            type={parcelData.type}
                            weight={parcelData.weight}
                            status={parcelData.status}
                            division={parcelData.division}
                            fee={parcelData.fee}
                            createdAt={new Date(parcelData.createdAt)}
                        />

                        {/* Current Status Card */}
                        <CurrentStatusCard 
                            status={parcelData.status}
                            deliveryDate={deliveryDate}
                            progressPercentage={getProgressPercentage()}
                        />

                        <TrackingTimelineCard
                            currentStatus={parcelData.status as string}
                            fromAddress={parcelData.fromAddress}
                            toAddress={parcelData.toAddress}
                            deliveryDate={deliveryDate}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="xl:col-span-1 space-y-6">
                        {/* Addresses Card */}
                        <AddressesCard 
                            fromAddress={parcelData.fromAddress}
                            toAddress={parcelData.toAddress}
                        />
                        {/* Sender & Receiver Information */}
                        <PeopleInfoCard 
                            sender={parcelData.sender}
                            receiver={parcelData.receiver}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParcelDetails;