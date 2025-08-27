import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { useNavigate } from "react-router-dom";
import type { IParcel, Parcel } from "@/types";
import type { Person } from "@/types/parcel.type";
import type { ReactNode } from "react";


interface ParcelTableTrowProps {
  parcel: Parcel | IParcel;
  user: Person
  actionButton?: ReactNode;
}

const ParcelTableTrow = ({ parcel, user, actionButton }: ParcelTableTrowProps) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/parcel-details/${parcel.trackingId}`);
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
            <p className="font-medium text-sm">{user.name ?? "N/A"}</p>
            <p className="text-xs text-muted-foreground">{user.email ?? "N/A"}</p>
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
            {new Date(parcel.createdAt as string).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </td>

        {/* Actions */}
        <td className="py-4 px-2">
          {actionButton ? actionButton : (
            <Button variant="outline" size="sm" onClick={handleView}>
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          )}
        </td>
      </tr>
    </>
  );
};

export default ParcelTableTrow;