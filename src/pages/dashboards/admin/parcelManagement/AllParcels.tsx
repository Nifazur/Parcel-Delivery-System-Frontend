/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import {
  Download,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,

} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllParcelsQuery, useGetParcelStatisticsQuery, useUpdateParcelStatusMutation } from '@/redux/features/parcelApi';
import { toast } from 'sonner';

import StatusBadge from '@/components/StatusBadge';
import ParcelCard from '@/components/dashboardComponents/parcelTable/ParcelCard';
import StatCard from '@/components/dashboardComponents/StatCard';
import ParcelTableThead from '@/components/dashboardComponents/parcelTable/ParcelTableThead';
import ParcelTableTrow from '@/components/dashboardComponents/parcelTable/ParcelTableTrow';
import ParcelTableHeader from '@/components/dashboardComponents/parcelTable/ParcelTableHeader';

import type { IParcel } from '@/types';
import type { Person } from '@/types/parcel.type';
import { useForm } from 'react-hook-form';

const ReceivedParcels: React.FC = () => {
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [updateStatus, { isLoading: updateStatusLoading }] = useUpdateParcelStatusMutation();
  const { register, handleSubmit, reset } = useForm();
  const [sortBy, setSortBy] = useState('latest');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 5;


  // Call ALL hooks at the top - no conditional hook calls!
  const { data: parcelStatistics, isLoading: statisticsLoading } = useGetParcelStatisticsQuery();
  const { data, isLoading, refetch } = useGetAllParcelsQuery({ page, limit });

  // Memoized values
  const statistics = parcelStatistics?.data;

  const stats = useMemo(() => {
    const pendingStatuses = ["requested", "approved", "dispatched", "in_transit"];

    const pending = statistics?.byStatus
      ?.filter((s: any) => pendingStatuses.includes(s._id))
      .reduce((acc: number, cur: any) => acc + cur.count, 0) || 0;

    const delivered = statistics?.byStatus?.find((s: any) => s._id === "delivered")?.count || 0;
    const cancelled = statistics?.byStatus?.find((s: any) => s._id === "cancelled")?.count || 0;

    return { pending, delivered, cancelled };
  }, [statistics]);

  const parcels: IParcel[] = useMemo(() => {
    return data?.data?.parcels || [];
  }, [data]);

  const totalPages = data?.data?.pages || 1;

  // Apply filters and sorting
  const filteredAndSortedParcels = useMemo(() => {
    let filtered = [...parcels];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(parcel => parcel.status === statusFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
        case 'oldest':
          return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
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

  // Actions
  const handleRefresh = () => {
    refetch();
    toast.success('Parcels refreshed!');
  };

  const handleExportData = () => {
    toast.success('Exporting parcel data...');
    // TODO: Implement exporting
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleStatusFilterChange = (newFilter: string) => {
    setStatusFilter(newFilter);
    setPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setPage(1);
  };

  // Loading state - now after ALL hooks have been called
  if (isLoading || statisticsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your parcels...</p>
        </div>
      </div>
    );
  }


  const onSubmit = async (data: any) => {
    if (!selectedParcelId) return;

    try {
      await updateStatus({
        id: selectedParcelId,
        statusData: {
          status: data.status,
          location: data.location,
          note: data.note,
        },
      }).unwrap();

      toast.success("Parcel status updated successfully");
      setOpen(false);
      reset();
      setSelectedParcelId(null);
      refetch();
    } catch (err) {
      console.error("Failed to update status", err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2">
              <Package className="w-6 h-6" />
              All Received Parcels
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              View and track all parcels received by you
            </p>
          </div>
          <div className="flex gap-2">
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

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <StatCard label="Total Parcels" value={statistics?.total ?? 0} icon={<Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />} />
          <StatCard label="Pending" value={stats.pending} icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />} />
          <StatCard label="Delivered" value={stats.delivered} icon={<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />} />
          <StatCard label="Cancelled" value={stats.cancelled} icon={<XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />} />
        </div>

        {/* Parcels */}
        <Card className="shadow-lg">
          <ParcelTableHeader
            title="Received Parcels"
            count={filteredAndSortedParcels.length}
            statusFilter={statusFilter}
            setStatusFilter={handleStatusFilterChange}
            sortBy={sortBy}
            setSortBy={handleSortChange}
          />

          <CardContent>
            {filteredAndSortedParcels.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Parcels Found</h3>
                <p className="text-muted-foreground mb-4">
                  {statusFilter !== 'all'
                    ? 'No parcels match your filter criteria.'
                    : 'No parcels have been received yet.'}
                </p>
              </div>
            ) : (
              <div>
                {/* Desktop */}
                <div className="hidden lg:block">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <ParcelTableThead
                        columns={[
                          { key: "trackingId", label: "Tracking ID" },
                          { key: "sender", label: "Sender" },
                          { key: "origin", label: "Origin" },
                          { key: "status", label: "Status" },
                          { key: "created", label: "Created" },
                          { key: "actions", label: "Actions" },
                        ]}
                      />
                      <tbody>
                        {filteredAndSortedParcels.map(parcel => (
                          <ParcelTableTrow
                            key={parcel._id}
                            parcel={parcel}
                            user={parcel.sender as Person}
                            actionButton={
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedParcelId(parcel._id as string);
                                  setOpen(true);
                                }}
                              >
                                Change Status
                              </Button>
                            }
                          />
                        ))}
                      </tbody>

                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Parcel Status</DialogTitle>
                          </DialogHeader>

                          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium">New Status</label>
                              <select
                                {...register("status")}
                                className="w-full border rounded-md p-2"
                              >
                                <option value="requested">Requested</option>
                                <option value="approved">Approved</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="in_transit">In Transit</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium">Location</label>
                              <Input {...register("location")} placeholder="Enter current location" />
                            </div>

                            <div>
                              <label className="block text-sm font-medium">Note</label>
                              <Textarea {...register("note")} placeholder="Optional note" />
                            </div>

                            <DialogFooter>
                              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                                Cancel
                              </Button>
                              <Button type="submit" disabled={updateStatusLoading}>
                                {updateStatusLoading ? "Updating..." : "Update"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </table>
                  </div>
                </div>

                {/* Tablet */}
                <div className="hidden md:block lg:hidden">
                  <div className="space-y-2">
                    {filteredAndSortedParcels.map(parcel => (
                      <div key={parcel._id} className="border rounded-lg p-3 hover:bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                            {parcel.trackingId}
                          </code>
                          <StatusBadge status={parcel.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium">{parcel.sender?.name as string}</p>
                            <p className="text-xs text-muted-foreground truncate">{parcel.sender?.email as string}</p>
                          </div>
                          <div className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedParcelId(parcel._id as string)
                                setOpen(true);
                              }}
                            >
                              Change Status
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 truncate">
                          From: {parcel.fromAddress}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile */}
                <div className="md:hidden">
                  {filteredAndSortedParcels.map(parcel => (
                    <ParcelCard
                      key={parcel._id}
                      parcel={parcel}
                      user={parcel.sender as Person}
                      actionButton={
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedParcelId(parcel._id as string);
                            setOpen(true);
                          }}
                        >
                          Change Status
                        </Button>
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(page - 1)}
                  className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {totalPages <= 7 ? (
                [...Array(totalPages)].map((_, idx) => {
                  const p = idx + 1;
                  return (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={p === page}
                        onClick={() => handlePageChange(p)}
                        className="cursor-pointer"
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })
              ) : (
                <>
                  <PaginationItem>
                    <PaginationLink
                      isActive={page === 1}
                      onClick={() => handlePageChange(1)}
                      className="cursor-pointer"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>

                  {page > 4 && <PaginationEllipsis />}

                  {[...Array(3)].map((_, idx) => {
                    const p = page - 1 + idx;
                    if (p > 1 && p < totalPages) {
                      return (
                        <PaginationItem key={p}>
                          <PaginationLink
                            isActive={p === page}
                            onClick={() => handlePageChange(p)}
                            className="cursor-pointer"
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  {page < totalPages - 3 && <PaginationEllipsis />}

                  <PaginationItem>
                    <PaginationLink
                      isActive={page === totalPages}
                      onClick={() => handlePageChange(totalPages)}
                      className="cursor-pointer"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(page + 1)}
                  className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default ReceivedParcels;