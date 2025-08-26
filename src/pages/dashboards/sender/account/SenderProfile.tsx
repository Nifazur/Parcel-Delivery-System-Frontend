/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Shield,
  Calendar,
  Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useUserInfoQuery } from '@/redux/features/authApi';
import { useGetMySentParcelsQuery } from '@/redux/features/parcelApi';
import { calculateDashboardStats } from '@/utils/dashboardUtils';
import { toast } from 'sonner';

const SenderProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const { data: userInfo, isLoading: userLoading } = useUserInfoQuery(undefined);
  const { data: parcelsData } = useGetMySentParcelsQuery(undefined);
  
  const user = userInfo?.data;
  const parcels = parcelsData?.data || [];
  const stats = calculateDashboardStats(parcels);

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  };

  const handleSave = async () => {
    try {
      // Here you would call your update user API
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Profile Settings</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your account information and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-primary flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button
                      onClick={handleEdit}
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative group">
                    <Avatar className="w-24 h-24 border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                      <AvatarImage src={user?.picture} alt={user?.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                      </button>
                    )}
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-card-foreground">{user?.name}</h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                      {user?.role.map((role) => (
                        <Badge key={role} variant="secondary" className="capitalize">
                          {role.toLowerCase().replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="h-10"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{user?.name || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{user?.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="h-10"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{user?.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">Account Status</Label>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <Badge 
                        variant={user?.isActive === 'ACTIVE' ? 'default' : 'secondary'}
                        className={user?.isActive === 'ACTIVE' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {user?.isActive || 'Unknown'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="min-h-[80px] resize-none"
                      placeholder="Enter your full address"
                    />
                  ) : (
                    <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span>{user?.address || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                {/* Member Since */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Unknown'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stats.totalParcels}</div>
                    <div className="text-xs text-muted-foreground">Total Parcels</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
                    <div className="text-xs text-muted-foreground">Delivered</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
                    <div className="text-xs text-muted-foreground">Cancelled</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Update Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderProfile;