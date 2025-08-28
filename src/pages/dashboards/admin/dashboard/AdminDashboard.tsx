import React from "react";
import {
    useGetParcelStatisticsQuery,
    useGetAllParcelsQuery,
} from "@/redux/features/parcelApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, DollarSign, TrendingUp, Users, Clock } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import type { ParcelStatus } from "@/types";

const AdminDashboard: React.FC = () => {
    const { data: statsData, isLoading: statsLoading } = useGetParcelStatisticsQuery();
    const { data: allParcels, isLoading: parcelsLoading } = useGetAllParcelsQuery({ limit: 10 });

    if (statsLoading || parcelsLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const stats = statsData?.data;
    const parcels = allParcels?.data.parcels ?? [];

    const chartData = stats?.byStatus.map((s) => ({
        status: s._id,
        count: s.count,
        revenue: s.totalFee,
    }));

    const pieData = stats?.byStatus.map((s) => ({
        name: s._id,
        value: s.count,
    }));

    const chartConfig = {
        revenue: {
            label: "Revenue",
            color: "#3b82f6", // Fixed blue color
        },
        count: {
            label: "Count",
            color: "#10b981", // Fixed green color
        },
    };

    const pieChartConfig = {
        delivered: {
            label: "Delivered",
            color: "#10b981", // Green
        },
        in_transit: {
            label: "In Transit",
            color: "#f59e0b", // Yellow
        },
        requested: {
            label: "Requested",
            color: "#6b7280", // Gray
        },
        approved: {
            label: "Approved",
            color: "#3b82f6", // Blue
        },
        dispatched: {
            label: "Dispatched",
            color: "#8b5cf6", // Purple
        },
        cancelled: {
            label: "Cancelled",
            color: "#ef4444", // Red
        },
    };

    // Fixed colors array with proper hex values
    const COLORS = [
        "#10b981", // Green - for delivered
        "#f59e0b", // Yellow - for in transit
        "#3b82f6", // Blue - for approved
        "#6b7280", // Gray - for requested
        "#8b5cf6", // Purple - for dispatched
        "#ef4444", // Red - for cancelled
    ];

    const getStatusBadge = (status: string) => {
        const statusClasses: Record<ParcelStatus, string> = {
            requested: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
            approved: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
            dispatched: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
            in_transit: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
            delivered: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
            cancelled: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as ParcelStatus] || 'bg-muted text-muted-foreground'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Monitor your parcel delivery operations</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border border-border bg-card hover:shadow-lg transition-shadow duration-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-card-foreground">Total Parcels</CardTitle>
                            <Package className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{stats?.total?.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <TrendingUp className="h-3 w-3 inline mr-1" />
                                Total parcels processed
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border border-border bg-card hover:shadow-lg transition-shadow duration-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-card-foreground">Total Revenue</CardTitle>
                            <DollarSign className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">৳{stats?.totalRevenue?.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <TrendingUp className="h-3 w-3 inline mr-1" />
                                Total revenue earned
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border border-border bg-card hover:shadow-lg transition-shadow duration-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-card-foreground">Active Routes</CardTitle>
                            <Truck className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{stats?.byStatus?.length}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3 inline mr-1" />
                                Status types
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border border-border bg-card hover:shadow-lg transition-shadow duration-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-card-foreground">Delivery Stats</CardTitle>
                            <Users className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{parcels?.length || 0}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3 inline mr-1" />
                                Recent parcels
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Revenue Bar Chart */}
                    <Card className="lg:col-span-2 border border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">Revenue by Status</CardTitle>
                            <p className="text-sm text-muted-foreground">Revenue breakdown by parcel status</p>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis
                                        dataKey="status"
                                        tickLine={false}
                                        axisLine={false}
                                        className="text-muted-foreground"
                                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        className="text-muted-foreground"
                                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                    />
                                    <ChartTooltip
                                        content={
                                            <ChartTooltipContent
                                                labelFormatter={(label) => `Status: ${label}`}
                                                formatter={(value, name) => [
                                                    `৳${value.toLocaleString()}`,
                                                    name === 'revenue' ? 'Revenue' : 'Count'
                                                ]}
                                            />
                                        }
                                    />
                                    <Bar
                                        dataKey="revenue"
                                        fill="#74946b"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Status Distribution Pie Chart */}
                    <Card className="border border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">Status Distribution</CardTitle>
                            <p className="text-sm text-muted-foreground">Parcel status breakdown</p>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                        nameKey="name"
                                    >
                                        {pieData?.map((entry, index) => {
                                            // Map status to specific colors
                                            const getColorForStatus = (status: string) => {
                                                switch (status) {
                                                    case 'delivered': return "#b0b856"; // Green
                                                    case 'in_transit': return "#4d4d78"; // Yellow
                                                    case 'approved': return "#5f7590"; // Blue
                                                    case 'requested': return "#74946b"; // Gray
                                                    case 'dispatched': return "#8b5cf6"; // Purple
                                                    case 'cancelled': return "#a49c47"; // Red
                                                    default: return COLORS[index % COLORS.length];
                                                }
                                            };
                                            
                                            return (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={getColorForStatus(entry.name)}
                                                />
                                            );
                                        })}
                                    </Pie>
                                    <ChartTooltip
                                        content={
                                            <ChartTooltipContent
                                                formatter={(value, name) => [
                                                    `${value} parcels`,
                                                    name
                                                ]}
                                            />
                                        }
                                    />
                                </PieChart>
                            </ChartContainer>

                            {/* Legend */}
                            <div className="flex flex-wrap justify-center gap-3 mt-4">
                                {pieData?.map((entry, index) => {
                                    const getColorForStatus = (status: string) => {
                                        switch (status) {
                                            case 'delivered': return "#10b981"; // Green
                                            case 'in_transit': return "#f59e0b"; // Yellow
                                            case 'approved': return "#3b82f6"; // Blue
                                            case 'requested': return "#6b7280"; // Gray
                                            case 'dispatched': return "#8b5cf6"; // Purple
                                            case 'cancelled': return "#ef4444"; // Red
                                            default: return COLORS[index % COLORS.length];
                                        }
                                    };

                                    return (
                                        <div key={entry.name} className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: getColorForStatus(entry.name) }}
                                            />
                                            <span className="text-sm text-muted-foreground capitalize">
                                                {entry.name.replace('_', ' ')}: {entry.value}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Parcels Table */}
                <Card className="border border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">Recent Parcels</CardTitle>
                        <p className="text-sm text-muted-foreground">Latest parcel deliveries and updates</p>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg border border-border overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-muted/50 border-b border-border">
                                            <th className="text-left p-4 font-medium text-muted-foreground">Tracking ID</th>
                                            <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                                            <th className="text-left p-4 font-medium text-muted-foreground">Sender</th>
                                            <th className="text-left p-4 font-medium text-muted-foreground">Receiver</th>
                                            <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                                            <th className="text-left p-4 font-medium text-muted-foreground">Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parcels.map((p, index) => (
                                            <tr
                                                key={p._id}
                                                className={`border-b border-border hover:bg-muted/30 transition-colors ${index % 2 === 0 ? 'bg-card' : 'bg-muted/10'
                                                    }`}
                                            >
                                                <td className="p-4 font-mono text-sm text-foreground">{p.trackingId}</td>
                                                <td className="p-4 text-foreground capitalize">{p.type}</td>
                                                <td className="p-4 text-foreground">{p.sender?.name || 'N/A'}</td>
                                                <td className="p-4 text-foreground">{p.receiver?.name || 'N/A'}</td>
                                                <td className="p-4">{getStatusBadge(p.status)}</td>
                                                <td className="p-4 font-semibold text-foreground">৳{p.fee}</td>
                                            </tr>
                                        ))}
                                        {parcels.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                                    No parcels found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;