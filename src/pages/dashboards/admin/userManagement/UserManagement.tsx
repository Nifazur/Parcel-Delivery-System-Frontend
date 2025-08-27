import React, { useState } from 'react';
import { Edit, User, Mail, Phone, MapPin, Shield, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useGetAllUsersQuery, useUpdateUserMutation } from '@/redux/features/userApi';

// Interface definitions
interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string[];
  isActive: 'ACTIVE' | 'INACTIVE';
  isDeleted: boolean;
  phone?: string;
  address?: string;
  picture?: string;
  auths: Array<{
    provider: string;
    providerId: string;
  }>;
}

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: T;
}



const UserManagementTable = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState<Record<string, boolean>>({});

  // Redux hooks
  const { data: usersResponse, isLoading, isError, error } = useGetAllUsersQuery();
  const [updateUser, { isLoading: isUpdating,}] = useUpdateUserMutation();

  const users = usersResponse?.data || [];

  const getRoleBadgeColor = (roles: string[]) => {
    if (roles.includes('SUPER_ADMIN')) return 'bg-red-100 text-red-800 border-red-200';
    if (roles.includes('ADMIN')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (roles.includes('SENDER')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (roles.includes('RECEIVER')) return 'bg-green-100 text-green-800 border-green-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google':
        return '🔍';
      case 'credentials':
        return '🔐';
      default:
        return '👤';
    }
  };

  const toggleSensitiveInfo = (userId: string) => {
    setShowSensitiveInfo(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      try {
        await updateUser({
          id: selectedUser._id,
          data: {
            name: selectedUser.name,
            email: selectedUser.email,
            phone: selectedUser.phone,
            address: selectedUser.address,
            isActive: selectedUser.isActive,
            role: selectedUser.role
          }
        });
        setIsEditModalOpen(false);
        setSelectedUser(null);
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-card rounded-lg border">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-card rounded-lg border">
        <div className="flex flex-col items-center space-y-4 text-center">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <p className="text-destructive font-medium">Failed to load users</p>
          <p className="text-muted-foreground text-sm">
            {error?.message || 'Something went wrong'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">
            Total {usersResponse?.meta.total || 0} users found
          </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Roles</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Auth Provider</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {user.picture ? (
                          <img
                            src={user.picture}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {user.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">
                            {showSensitiveInfo[user._id] ? user.phone : '***-***-****'}
                          </span>
                        </div>
                      )}
                      {user.address && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{user.address}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.role.map((role) => (
                        <span
                          key={role}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor([role])}`}
                        >
                          {role.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.isActive === 'ACTIVE'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}
                    >
                      {user.isActive}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {getProviderIcon(user.auths[0]?.provider)}
                      </span>
                      <span className="text-sm text-foreground capitalize">
                        {user.auths[0]?.provider}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleSensitiveInfo(user._id)}
                        className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                        title={showSensitiveInfo[user._id] ? 'Hide sensitive info' : 'Show sensitive info'}
                      >
                        {showSensitiveInfo[user._id] ? (
                          <EyeOff className="h-4 w-4 text-secondary-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-secondary-foreground" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 rounded-md bg-primary hover:bg-primary/90 transition-colors"
                        title="Edit user"
                      >
                        <Edit className="h-4 w-4 text-primary-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {users.map((user) => (
          <div key={user._id} className="bg-card rounded-lg border p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-medium text-foreground truncate">
                    {user.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleSensitiveInfo(user._id)}
                  className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  {showSensitiveInfo[user._id] ? (
                    <EyeOff className="h-4 w-4 text-secondary-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-secondary-foreground" />
                  )}
                </button>
                <button
                  onClick={() => handleEditUser(user)}
                  className="p-2 rounded-md bg-primary hover:bg-primary/90 transition-colors"
                >
                  <Edit className="h-4 w-4 text-primary-foreground" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                {user.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {showSensitiveInfo[user._id] ? user.phone : '***-***-****'}
                    </span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{user.address}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.isActive === 'ACTIVE'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
                  >
                    {user.isActive}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-base">
                    {getProviderIcon(user.auths[0]?.provider)}
                  </span>
                  <span className="text-foreground capitalize">
                    {user.auths[0]?.provider}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {user.role.map((role) => (
                <span
                  key={role}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor([role])}`}
                >
                  {role.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Edit User</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                
                {selectedUser.phone && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={selectedUser.phone}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                )}
                
                {selectedUser.address && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={selectedUser.address}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, address: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    value={selectedUser.isActive}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        isActive: e.target.value as 'ACTIVE' | 'INACTIVE'
                      })
                    }
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-input rounded-md text-foreground hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUser}
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{isUpdating ? 'Updating...' : 'Update'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;