import React, { useMemo } from 'react';
import {
    Package,
    Plus,
    Clock,
    CheckCircle,
    TrendingUp,
    Eye,
    Truck,
    MapPin,
    User,
    DollarSign,
    Activity,
    ArrowUpRight,
    RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetMySentParcelsQuery } from '@/redux/features/parcelApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import StatusBadge from '@/components/StatusBadge';
import type { Parcel } from '@/types';

const SenderDashboard: React.FC = () => {
    const navigate = useNavigate();
    
    // API calls
    const { data: parcelsData, isLoading: parcelsLoading, refetch } = useGetMySentParcelsQuery(undefined);
    
    const parcels: Parcel[] = useMemo(() => {
        return parcelsData?.data || [];
    }, [parcelsData]);

    // Calculate dashboard statistics
    const dashboardStats = useMemo(() => {
        const totalParcels = parcels.length;
        const deliveredParcels = parcels.filter(p => p.status === 'delivered').length;
        const pendingParcels = parcels.filter(p => 
            ['requested', 'approved', 'dispatched', 'in_transit'].includes(p.status)
        ).length;
        const cancelledParcels = parcels.filter(p => p.status === 'cancelled').length;
        
        const totalRevenue = parcels
            .filter(p => p.status === 'delivered')
            .reduce((sum, parcel) => sum + (parcel.fee || 0), 0);
            
        const avgDeliveryTime = 0; // This would need delivery time calculation
        const deliveryRate = totalParcels > 0 ? (deliveredParcels / totalParcels) * 100 : 0;
        
        return {
            totalParcels,
            deliveredParcels,
            pendingParcels,
            cancelledParcels,
            totalRevenue,
            avgDeliveryTime,
            deliveryRate
        };
    }, [parcels]);

    // Get recent parcels (last 5)
    const recentParcels = useMemo(() => {
        return [...parcels]
            .sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime())
            .slice(0, 5);
    }, [parcels]);

    // Get parcels by status for quick view
    const parcelsByStatus = useMemo(() => {
        const statusGroups = {
            requested: parcels.filter(p => p.status === 'requested'),
            approved: parcels.filter(p => p.status === 'approved'),
            in_transit: parcels.filter(p => p.status === 'in_transit'),
            delivered: parcels.filter(p => p.status === 'delivered'),
        };
        return statusGroups;
    }, [parcels]);

    const handleCreateParcel = () => {
        navigate('/create-parcel');
    };

    const handleViewAllParcels = () => {
        navigate('/my-parcels');
    };

    const handleTrackParcel = (trackingId: string) => {
        navigate(`/track-parcel/${trackingId}`);
    };

    const handleRefresh = () => {
        refetch();
        toast.success('Dashboard refreshed!');
    };

    if (parcelsLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Loading dashboard...</p>
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
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                            Sender Dashboard
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Manage your parcels and track deliveries
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleRefresh}
                            variant="outline"
                            size="sm"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </Button>
                        <Button onClick={handleCreateParcel} className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Plus className="w-4 h-4 mr-2" />
                            Send Parcel
                        </Button>
                    </div>
                </div>

                {/* Main Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Parcels</p>
                                    <div className="text-2xl font-bold text-primary">
                                        {dashboardStats.totalParcels}
                                    </div>
                                </div>
                                <Package className="h-8 w-8 text-primary" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-chart-1">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                                    <div className="text-2xl font-bold" style={{ color: 'hsl(var(--chart-1))' }}>
                                        {dashboardStats.deliveredParcels}
                                    </div>
                                </div>
                                <CheckCircle className="h-8 w-8" style={{ color: 'hsl(var(--chart-1))' }} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-chart-4">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                    <div className="text-2xl font-bold" style={{ color: 'hsl(var(--chart-4))' }}>
                                        {dashboardStats.pendingParcels}
                                    </div>
                                </div>
                                <Clock className="h-8 w-8" style={{ color: 'hsl(var(--chart-4))' }} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-chart-2">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                                    <div className="text-2xl font-bold" style={{ color: 'hsl(var(--chart-2))' }}>
                                        ৳{dashboardStats.totalRevenue.toFixed(0)}
                                    </div>
                                </div>
                                <DollarSign className="h-8 w-8" style={{ color: 'hsl(var(--chart-2))' }} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-card-foreground">Delivery Rate</h3>
                                <TrendingUp className="h-5 w-5" style={{ color: 'hsl(var(--chart-1))' }} />
                            </div>
                            <div className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--chart-1))' }}>
                                {dashboardStats.deliveryRate.toFixed(1)}%
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {dashboardStats.deliveredParcels} of {dashboardStats.totalParcels} parcels delivered
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-card-foreground">Active Shipments</h3>
                                <Truck className="h-5 w-5" style={{ color: 'hsl(var(--chart-3))' }} />
                            </div>
                            <div className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--chart-3))' }}>
                                {parcelsByStatus.in_transit.length}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Currently in transit
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-card-foreground">Avg. Fee</h3>
                                <Activity className="h-5 w-5" style={{ color: 'hsl(var(--chart-2))' }} />
                            </div>
                            <div className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--chart-2))' }}>
                                ৳{dashboardStats.totalParcels > 0 ? (dashboardStats.totalRevenue / dashboardStats.deliveredParcels || 0).toFixed(0) : '0'}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Per delivered parcel
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button 
                                onClick={handleCreateParcel}
                                className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Send New Parcel
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={handleViewAllParcels}
                                className="w-full justify-start"
                            >
                                <Package className="w-4 h-4 mr-2" />
                                View All Parcels
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => navigate('/pending-parcels')}
                                className="w-full justify-start"
                            >
                                <Clock className="w-4 h-4 mr-2" />
                                Pending Parcels ({dashboardStats.pendingParcels})
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => navigate('/delivered-parcels')}
                                className="w-full justify-start"
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Delivered Parcels ({dashboardStats.deliveredParcels})
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recent Parcels */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Recent Parcels</CardTitle>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={handleViewAllParcels}
                                >
                                    View All
                                    <ArrowUpRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {recentParcels.length === 0 ? (
                                <div className="text-center py-8">
                                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2 text-card-foreground">No Parcels Yet</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Start by sending your first parcel
                                    </p>
                                    <Button onClick={handleCreateParcel}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Send Parcel
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentParcels.map((parcel) => (
                                        <div
                                            key={parcel._id}
                                            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <code className="bg-accent text-accent-foreground px-2 py-1 rounded text-sm font-mono">
                                                        {parcel.trackingId}
                                                    </code>
                                                    <StatusBadge status={parcel.status} />
                                                </div>
                                                <div className="text-sm space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-3 h-3 text-muted-foreground" />
                                                        <span className="font-medium text-card-foreground">{parcel.receiver.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <MapPin className="w-3 h-3" />
                                                        <span className="truncate max-w-xs">{parcel.toAddress}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                        <span>Weight: {parcel.weight}kg</span>
                                                        <span>Fee: ৳{parcel.fee}</span>
                                                        <span>{new Date(parcel.createdAt as string).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleTrackParcel(parcel.trackingId)}
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                Track
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Status Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Parcel Status Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-accent rounded-lg">
                                <div className="text-2xl font-bold text-primary mb-1">
                                    {parcelsByStatus.requested.length}
                                </div>
                                <div className="text-sm text-muted-foreground">Requested</div>
                            </div>
                            <div className="text-center p-4 bg-accent rounded-lg">
                                <div className="text-2xl font-bold mb-1" style={{ color: 'hsl(var(--chart-1))' }}>
                                    {parcelsByStatus.approved.length}
                                </div>
                                <div className="text-sm text-muted-foreground">Approved</div>
                            </div>
                            <div className="text-center p-4 bg-accent rounded-lg">
                                <div className="text-2xl font-bold mb-1" style={{ color: 'hsl(var(--chart-3))' }}>
                                    {parcelsByStatus.in_transit.length}
                                </div>
                                <div className="text-sm text-muted-foreground">In Transit</div>
                            </div>
                            <div className="text-center p-4 bg-accent rounded-lg">
                                <div className="text-2xl font-bold mb-1" style={{ color: 'hsl(var(--chart-5))' }}>
                                    {parcelsByStatus.delivered.length}
                                </div>
                                <div className="text-sm text-muted-foreground">Delivered</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SenderDashboard;