import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Parcel } from "@/types";

import { Calendar, Eye, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router";

const ParcelCard: React.FC<{ parcel: Parcel }> = ({ parcel }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/track-parcel/${parcel.trackingId}`);
  };

  return (  
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with tracking ID and status */}
          <div className="flex items-center justify-between">
            <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
              {parcel.trackingId}
            </code>
            <StatusBadge status={parcel.status} />
          </div>

          {/* Receiver info */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {parcel.receiver.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {parcel.receiver.email}
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground flex-1 line-clamp-2">
              {parcel.toAddress}
            </p>
          </div>

          {/* Date and action */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {parcel.createdAt}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleView}
              className="text-xs"
            >
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParcelCard;