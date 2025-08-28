import React, { useState, useMemo } from 'react';
import {
    CheckCircle,
    Download,
    Package,
    RefreshCw,
    Eye,
    Star
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetMyReceivedParcelsQuery } from '@/redux/features/parcelApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import ParcelTableHeader from '@/components/dashboardComponents/parcelTable/ParcelTableHeader';
import ParcelTableTrow from '@/components/dashboardComponents/parcelTable/ParcelTableTrow';
import ParcelTableThead from '@/components/dashboardComponents/parcelTable/ParcelTableThead';
import StatusBadge from '@/components/StatusBadge';
import ParcelCard from '@/components/dashboardComponents/parcelTable/ParcelCard';
import StatCard from '@/components/dashboardComponents/StatCard';
import type { IParcel } from '@/types';
import type { Person } from '@/types/parcel.type';

const DeliveredParcels: React.FC = () => {
    const [sortBy, setSortBy] = useState('latest');

    const navigate = useNavigate();
    const { data, isLoading, refetch } = useGetMyReceivedParcelsQuery(undefined);
    
    const parcels: IParcel[] = useMemo(() => {
        return data?.data || [];
    }, [data]);

    // Filter and sort delivered parcels
    const filteredAndSortedParcels = useMemo(() => {
        const filtered = [...parcels].filter(parcel => parcel.status === 'delivered');

        // Sort parcels
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'latest':
                    return new Date(b.updatedAt as string).getTime() - new Date(a.updatedAt as string).getTime();
                case 'oldest':
                    return new Date(a.updatedAt as string).getTime() - new Date(b.updatedAt as string).getTime();
                case 'weight':
                    return (b.weight ?? 0) - (a.weight ?? 0);
                case 'fee':
                    return (b.fee ?? 0) - (a.fee ?? 0);
                case 'status':
                    return a.status.localeCompare(b.status);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [parcels, sortBy]);

    const handleRefresh = () => {
        refetch();
        toast.success('Parcels refreshed!');
    };

    const handleExportData = () => {
        toast.success('Exporting delivery report...');
        // Implementation for exporting data
    };

    const handleRateDelivery = (parcel: IParcel) => {
        toast.success(`Rating delivery for ${parcel.trackingId}...`);
        // Implementation for rating delivery
    };

    const calculateStats = () => {
        const totalDelivered = filteredAndSortedParcels.length;
        const totalRevenue = filteredAndSortedParcels.reduce((sum, parcel) => sum + parcel.fee, 0);
        const avgWeight = totalDelivered > 0 ? 
            filteredAndSortedParcels.reduce((sum, parcel) => sum + parcel.weight, 0) / totalDelivered : 0;
        const avgFee = totalDelivered > 0 ? totalRevenue / totalDelivered : 0;

        return { totalDelivered, totalRevenue, avgWeight, avgFee };
    };

    const stats = calculateStats();

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Loading delivered parcels...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            Delivered Parcels
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            View all successfully delivered parcels and download reports
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleExportData}
                            variant="outline"
                            className="hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <Button
                            onClick={handleRefresh}
                            variant="outline"
                            className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    <StatCard
                        label="Total Delivered"
                        value={stats.totalDelivered}
                        icon={<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
                    />
                    <StatCard
                        label="Total Revenue"
                        value={`৳${stats.totalRevenue.toFixed(0)}`}
                        icon={<Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
                    />
                    <StatCard
                        label="Avg Weight"
                        value={`${stats.avgWeight.toFixed(1)}kg`}
                        icon={<Package className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />}
                    />
                    <StatCard
                        label="Avg Fee"
                        value={`৳${stats.avgFee.toFixed(0)}`}
                        icon={<Star className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />}
                    />
                </div>

                {/* Parcels List */}
                <Card className="shadow-lg">
                    <ParcelTableHeader
                        title="Delivered Parcels"
                        count={filteredAndSortedParcels.length}
                        statusFilter="delivered"
                        setStatusFilter={() => {}} // Disabled since we only show delivered
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <CardContent>
                        {filteredAndSortedParcels.length === 0 ? (
                            <div className="text-center py-12">
                                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No Delivered Parcels</h3>
                                <p className="text-muted-foreground mb-4">
                                    You haven't had any deliveries yet.
                                </p>
                            </div>
                        ) : (
                            <div>
                                {/* Desktop Table View */}
                                <div className="hidden lg:block">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <ParcelTableThead
                                                columns={[
                                                    { key: "trackingId", label: "Tracking ID" },
                                                    { key: "sender", label: "Sender" },
                                                    { key: "destination", label: "Destination" },
                                                    { key: "status", label: "Status" },
                                                    { key: "delivered", label: "Delivered Date" },
                                                    { key: "actions", label: "Actions" },
                                                ]}
                                            />
                                            <tbody>
                                                {filteredAndSortedParcels.map((parcel) => (
                                                    <ParcelTableTrow
                                                        key={parcel._id}
                                                        parcel={parcel}
                                                        user={parcel.sender as Person}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Tablet Compact Table View */}
                                <div className="hidden md:block lg:hidden">
                                    <div className="space-y-2">
                                        {filteredAndSortedParcels.map((parcel) => (
                                            <div key={parcel._id} className="border border-green-100 rounded-lg p-3 hover:bg-green-50/50">
                                                <div className="flex items-center justify-between mb-2">
                                                    <code className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-mono">
                                                        {parcel.trackingId}
                                                    </code>
                                                    <StatusBadge status={parcel.status} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="font-medium">{parcel.sender.name}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{parcel.sender.email}</p>
                                                    </div>
                                                    <div className="text-right space-x-1">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => navigate(`/track-parcel/${parcel.trackingId}`)}
                                                        >
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            View
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleRateDelivery(parcel)}
                                                            className="hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200"
                                                        >
                                                            <Star className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-2 truncate">
                                                    {parcel.toAddress}
                                                </p>
                                                <p className="text-xs text-green-600 mt-1">
                                                    Revenue: ৳{parcel.fee}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Card View */}
                                <div className="md:hidden">
                                    {filteredAndSortedParcels.map((parcel) => (
                                        <ParcelCard 
                                            key={parcel._id} 
                                            parcel={parcel}
                                            user={parcel.sender as Person}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DeliveredParcels;