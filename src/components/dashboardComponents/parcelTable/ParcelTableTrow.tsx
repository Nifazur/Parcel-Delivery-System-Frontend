import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { useNavigate } from "react-router-dom";
import type { Parcel } from "@/types";


interface ParcelTableTrowProps {
  parcel: Parcel;
}

const ParcelTableTrow = ({ parcel }: ParcelTableTrowProps) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/track-parcel/${parcel.trackingId}`);
  };

  return (
    <>
      {/* 🖥️ Desktop Table Row */}
      <tr key={parcel._id} className="border-b hover:bg-muted/50 hidden lg:table-row">
        {/* Tracking ID */}
        <td className="py-4 px-2">
          <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
            {parcel.trackingId}
          </code>
        </td>

        {/* Receiver */}
        <td className="py-4 px-2">
          <div>
            <p className="font-medium text-sm">{parcel.receiver.name}</p>
            <p className="text-xs text-muted-foreground">{parcel.receiver.email}</p>
            <p className="text-xs text-muted-foreground">{parcel.receiver.phone}</p>
          </div>
        </td>

        {/* Destination */}
        <td className="py-4 px-2">
          <p className="text-sm text-muted-foreground max-w-48 truncate">
            {parcel.toAddress}
          </p>
        </td>

        {/* Status */}
        <td className="py-4 px-2">
          <StatusBadge status={parcel.status} />
        </td>

        {/* Created Date */}
        <td className="py-4 px-2">
          <p className="text-sm">
            {new Date(parcel.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </td>

        {/* Actions */}
        <td className="py-4 px-2">
          <Button variant="outline" size="sm" onClick={handleView}>
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
        </td>
      </tr>
    </>
  );
};

export default ParcelTableTrow;