import { CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Filter } from "lucide-react";

interface ParcelHeaderProps {
  title: string;
  count: number;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const ParcelTableHeader = ({
  title,
  count,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}: ParcelHeaderProps) => {
  return (
    <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
      {/* Left Title */}
      <CardTitle className="text-lg text-primary flex items-center gap-2">
        <Package className="w-5 h-5" />
        {title} ({count})
      </CardTitle>

      {/* Right Filters */}
      <CardTitle className="flex flex-col gap-y-2 sm:flex-row  sm:gap-x-2 w-full sm:w-fit">
        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full justify-center">
            <Package className="w-4 h-4 sm:mr-2" />
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="requested">Requested</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="dispatched">Dispatched</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full justify-center">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="weight">Weight (High to Low)</SelectItem>
            <SelectItem value="fee">Fee (High to Low)</SelectItem>
            <SelectItem value="status">Status (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </CardTitle>
    </CardHeader>
  );
};

export default ParcelTableHeader;