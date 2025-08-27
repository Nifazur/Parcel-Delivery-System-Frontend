import React, { useState, useMemo } from 'react';
import {
    Clock,
    Package,
    RefreshCw,
    Eye,
    Truck
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetMySentParcelsQuery } from '@/redux/features/parcelApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import ParcelTableHeader from '@/components/dashboardComponents/parcelTable/ParcelTableHeader';
import ParcelTableTrow from '@/components/dashboardComponents/parcelTable/ParcelTableTrow';
import ParcelTableThead from '@/components/dashboardComponents/parcelTable/ParcelTableThead';
import StatusBadge from '@/components/StatusBadge';
import ParcelCard from '@/components/dashboardComponents/parcelTable/ParcelCard';
import StatCard from '@/components/dashboardComponents/StatCard';
import type { Parcel } from '@/types';

const PendingParcels: React.FC = () => {
    const [sortBy, setSortBy] = useState('latest');

    const navigate = useNavigate();
    const { data, isLoading, refetch } = useGetMySentParcelsQuery(undefined);
    
    const parcels: Parcel[] = useMemo(() => {
        return data?.data || [];
    }, [data]);

    // Filter and sort pending parcels
    const filteredAndSortedParcels = useMemo(() => {
        const filtered = [...parcels].filter(parcel => 
            ['requested', 'approved', 'dispatched', 'in_transit'].includes(parcel.status)
        );

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


    const calculateStats = () => {
        const totalPending = filteredAndSortedParcels.length;
        const totalValue = filteredAndSortedParcels.reduce((sum, parcel) => sum + parcel.fee, 0);
        const avgWeight = totalPending > 0 ? 
            filteredAndSortedParcels.reduce((sum, parcel) => sum + parcel.weight, 0) / totalPending : 0;
        
        const statusCounts = {
            requested: filteredAndSortedParcels.filter(p => p.status === 'requested').length,
            approved: filteredAndSortedParcels.filter(p => p.status === 'approved').length,
            dispatched: filteredAndSortedParcels.filter(p => p.status === 'dispatched').length,
            in_transit: filteredAndSortedParcels.filter(p => p.status === 'in_transit').length,
        };

        return { totalPending, totalValue, avgWeight, statusCounts };
    };

    const stats = calculateStats();

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Loading pending parcels...</p>
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
                            <Clock className="w-6 h-6 text-orange-600" />
                            Pending Parcels
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Track your parcels that are currently being processed or in transit
                        </p>
                    </div>
                    <div className="flex gap-2">
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
                        label="Total Pending"
                        value={stats.totalPending}
                        icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />}
                    />
                    <StatCard
                        label="Total Value"
                        value={`৳${stats.totalValue.toFixed(0)}`}
                        icon={<Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
                    />
                    <StatCard
                        label="In Transit"
                        value={stats.statusCounts.in_transit}
                        icon={<Truck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />}
                    />
                    <StatCard
                        label="Avg Weight"
                        value={`${stats.avgWeight.toFixed(1)}kg`}
                        icon={<Package className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
                    />
                </div>


                {/* Parcels List */}
                <Card className="shadow-lg">
                    <ParcelTableHeader
                        title="Pending Parcels"
                        count={filteredAndSortedParcels.length}
                        statusFilter="pending"
                        setStatusFilter={() => {}} // Disabled since we only show pending
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <CardContent>
                        {filteredAndSortedParcels.length === 0 ? (
                            <div className="text-center py-12">
                                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No Pending Parcels</h3>
                                <p className="text-muted-foreground mb-4">
                                    All your parcels have been delivered or completed!
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
                                                    { key: "receiver", label: "Receiver" },
                                                    { key: "destination", label: "Destination" },
                                                    { key: "status", label: "Status" },
                                                    { key: "created", label: "Created Date" },
                                                    { key: "actions", label: "Actions" },
                                                ]}
                                            />
                                            <tbody>
                                                {filteredAndSortedParcels.map((parcel) => (
                                                    <ParcelTableTrow
                                                        key={parcel._id}
                                                        parcel={parcel}
                                                        user={parcel.receiver}
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
                                            <div key={parcel._id} className="border border-orange-100 rounded-lg p-3 hover:bg-orange-50/50">
                                                <div className="flex items-center justify-between mb-2">
                                                    <code className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm font-mono">
                                                        {parcel.trackingId}
                                                    </code>
                                                    <StatusBadge status={parcel.status} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="font-medium">{parcel.receiver.name}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{parcel.receiver.email}</p>
                                                    </div>
                                                    <div className="text-right space-x-1">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => navigate(`/track-parcel/${parcel.trackingId}`)}
                                                        >
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            Track
                                                        </Button>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-2 truncate">
                                                    {parcel.toAddress}
                                                </p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <p className="text-xs text-orange-600">
                                                        Fee: ৳{parcel.fee}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Weight: {parcel.weight}kg
                                                    </p>
                                                </div>
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
                                            user={parcel.receiver}
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

export default PendingParcels;