import React from 'react';
import { 
  Package,
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { StatusBadgeProps } from '@/types/dashboard';


const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const configs = {
    requested: { 
      color: 'bg-gray-100 text-gray-800', 
      icon: <Clock className="w-3 h-3" />,
      label: 'REQUESTED'
    },
    approved: { 
      color: 'bg-blue-100 text-blue-800', 
      icon: <CheckCircle className="w-3 h-3" />,
      label: 'APPROVED'
    },
    dispatched: { 
      color: 'bg-purple-100 text-purple-800', 
      icon: <Package className="w-3 h-3" />,
      label: 'DISPATCHED'
    },
    in_transit: { 
      color: 'bg-yellow-100 text-yellow-800', 
      icon: <Truck className="w-3 h-3" />,
      label: 'IN TRANSIT'
    },
    delivered: { 
      color: 'bg-green-100 text-green-800', 
      icon: <CheckCircle className="w-3 h-3" />,
      label: 'DELIVERED'
    },
    cancelled: { 
      color: 'bg-red-100 text-red-800', 
      icon: <XCircle className="w-3 h-3" />,
      label: 'CANCELLED'
    }
  };

  const config = configs[status];
  
  return (
    <Badge className={`${config.color} inline-flex items-center gap-1 text-xs font-medium`}>
      {config.icon}
      <span className="hidden sm:inline">{config.label}</span>
      <span className="sm:hidden">{config.label.substring(0, 3)}</span>
    </Badge>
  );
};

export default StatusBadge;