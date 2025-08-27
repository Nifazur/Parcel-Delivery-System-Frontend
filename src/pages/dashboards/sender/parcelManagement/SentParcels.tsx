import React, { useState, useMemo } from 'react';
import {
    Send,
    Download,
    Package,
    CheckCircle,
    XCircle,
    Clock,
    RefreshCw,
    Plus,
    Eye
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetMySentParcelsQuery } from '@/redux/features/parcelApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import ParcelTableHeader from '@/components/dashboardComponents/parcelTable/parcelTableHeader';
import ParcelTableTrow from '@/components/dashboardComponents/parcelTable/ParcelTableTrow';
import ParcelTableThead from '@/components/dashboardComponents/parcelTable/ParcelTableThead';
import StatusBadge from '@/components/StatusBadge';
import ParcelCard from '@/components/dashboardComponents/parcelTable/ParcelCard';
import StatCard from '@/components/dashboardComponents/StatCard';
import type { Parcel } from '@/types';

const SentParcels: React.FC = () => {
    const [sortBy, setSortBy] = useState('latest');
    const [statusFilter, setStatusFilter] = useState('all');

    const navigate = useNavigate();
    const { data, isLoading, refetch } = useGetMySentParcelsQuery(undefined);
    console.log(data);
    
    const parcels: Parcel[] = useMemo(() => {
        return data?.data || [];
    }, [data]);

    // Apply filters and sort
    const filteredAndSortedParcels = useMemo(() => {
        let filtered = [...parcels]; // Copy

        if (statusFilter !== 'all') {
            filtered = filtered.filter(parcel => parcel.status === statusFilter);
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'latest':
                    return new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime();
                case 'oldest':
                    return new Date(a.createdAt as string).getTime() - new Date(b.createdAt as string).getTime();
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
    }, [parcels, statusFilter, sortBy]);

    const handleRefresh = () => {
        refetch();
        toast.success('Parcels refreshed!');
    };

    const handleCreateNew = () => {
        navigate('/sender/create-parcel');
    };

    const handleExportData = () => {
        toast.success('Exporting parcel data...');
        // Implementation for exporting data
    };

    const calculateStats = () => {
        const total = parcels.length;
        const pending = parcels.filter(p => ['requested', 'approved', 'dispatched', 'in_transit'].includes(p.status)).length;
        const delivered = parcels.filter(p => p.status === 'delivered').length;
        const cancelled = parcels.filter(p => p.status === 'cancelled').length;

        return { total, pending, delivered, cancelled };
    };

    const stats = calculateStats();

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Loading your parcels...</p>
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
                            <Send className="w-6 h-6" />
                            All Sent Parcels
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Manage and track all your sent parcels in one place
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleCreateNew}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create New
                        </Button>
                        <Button
                            onClick={handleExportData}
                            variant="outline"
                            className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
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
                        label="Total Parcels"
                        value={stats.total}
                        icon={<Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
                    />
                    <StatCard
                        label="Pending"
                        value={stats.pending}
                        icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />}
                    />
                    <StatCard
                        label="Delivered"
                        value={stats.delivered}
                        icon={<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
                    />
                    <StatCard
                        label="Cancelled"
                        value={stats.cancelled}
                        icon={<XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />}
                    />
                </div>

                {/* Parcels List */}
                <Card className="shadow-lg">
                    <ParcelTableHeader
                        title="Parcels"
                        count={filteredAndSortedParcels.length}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <CardContent>
                        {filteredAndSortedParcels.length === 0 ? (
                            <div className="text-center py-12">
                                <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No Parcels Found</h3>
                                <p className="text-muted-foreground mb-4">
                                    {statusFilter !== 'all'
                                        ? 'No parcels match your filter criteria.'
                                        : 'You haven\'t sent any parcels yet.'}
                                </p>
                                {statusFilter === 'all' && (
                                    <Button onClick={handleCreateNew} className="bg-primary hover:bg-primary/90">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Your First Parcel
                                    </Button>
                                )}
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
                                                    { key: "created", label: "Created" },
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
                                            <div key={parcel._id} className="border rounded-lg p-3 hover:bg-muted/50">
                                                <div className="flex items-center justify-between mb-2">
                                                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                                                        {parcel.trackingId}
                                                    </code>
                                                    <StatusBadge status={parcel.status} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="font-medium">{parcel.receiver?.name as string}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{parcel.receiver.email}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => navigate(`/track-parcel/${parcel.trackingId}`)}
                                                        >
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            View
                                                        </Button>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-2 truncate">
                                                    {parcel.toAddress}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Card View */}
                                <div className="md:hidden">
                                    {filteredAndSortedParcels.map((parcel) => (
                                        <ParcelCard key={parcel._id} parcel={parcel} user={parcel.receiver} />
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

export default SentParcels;