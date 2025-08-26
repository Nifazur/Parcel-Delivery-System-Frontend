import type { Parcel } from '@/types';
import type { DashboardStats } from '@/types/dashboard';

export const calculateDashboardStats = (parcels: Parcel[]): DashboardStats => {
  return {
    totalParcels: parcels.length,
    pending: parcels.filter(p => 
      ['requested', 'approved', 'dispatched', 'in_transit'].includes(p.status)
    ).length,
    delivered: parcels.filter(p => p.status === 'delivered').length,
    cancelled: parcels.filter(p => p.status === 'cancelled').length
  };
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return dateString;
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};