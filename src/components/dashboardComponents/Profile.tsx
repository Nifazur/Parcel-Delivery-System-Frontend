
import { useUserInfoQuery } from '@/redux/features/authApi';
import type { IUser } from '@/types';
import { User, Mail, Phone, MapPin, Shield, Key, Loader2, AlertCircle } from 'lucide-react';
import SectionHeader from '../SectionHeader';


interface IUserResponse {
    data: IUser;
    message: string;
}



const Profile = () => {
    const { data: userResponse, isLoading, isError, error } = useUserInfoQuery(undefined) as {
        data?: IUserResponse;
        isLoading: boolean;
        isError: boolean;
        error?: { message?: string };
    };


    const user = userResponse?.data;

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'SUPER_ADMIN':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'ADMIN':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'SENDER':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'RECEIVER':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'USER':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getProviderIcon = (provider: string) => {
        switch (provider) {
            case 'google':
                return '🔍';
            case 'credentials':
                return '🔐';
            case 'facebook':
                return '📘';
            default:
                return '👤';
        }
    };

    const getProviderDisplayName = (provider: string) => {
        switch (provider) {
            case 'google':
                return 'Google';
            case 'credentials':
                return 'Email & Password';
            case 'facebook':
                return 'Facebook';
            default:
                return provider.charAt(0).toUpperCase() + provider.slice(1);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px] bg-card rounded-lg border">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="flex items-center justify-center min-h-[400px] bg-card rounded-lg border">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                    <p className="text-destructive font-medium">Failed to load profile</p>
                    <p className="text-muted-foreground text-sm">
                        {error?.message || 'Something went wrong'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-background min-h-screen">
            {/* Header */}
            <SectionHeader icon={User} title="My Profile" description="profile information" containerClassName=""></SectionHeader>

            {/* Profile Card */}
            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-8">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="relative">
                            {user.picture ? (
                                <img
                                    src={user.picture}
                                    alt={user.name}
                                    className="h-24 w-24 rounded-full object-cover border-4 border-background shadow-lg"
                                />
                            ) : (
                                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-background shadow-lg">
                                    <User className="h-12 w-12 text-primary" />
                                </div>
                            )}
                            <div className={`absolute -bottom-2 -right-2 h-6 w-6 rounded-full border-2 border-background ${user.isActive === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                                }`} title={user.isActive === 'ACTIVE' ? 'Active' : 'Inactive'} />
                        </div>

                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl font-bold text-foreground mb-1">
                                {user.name}
                            </h2>
                            <p className="text-muted-foreground mb-3">{user.email}</p>

                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                {user.role.map((role) => (
                                    <span
                                        key={role}
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(role)}`}
                                    >
                                        {role.replace('_', ' ')}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="px-6 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-primary" />
                                <span>Contact Information</span>
                            </h3>

                            <div className="space-y-3 pl-7">
                                <div className="flex items-start space-x-3">
                                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Email</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>

                                {user.phone && (
                                    <div className="flex items-start space-x-3">
                                        <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-foreground">Phone</p>
                                            <p className="text-sm text-muted-foreground">{user.phone}</p>
                                        </div>
                                    </div>
                                )}

                                {user.address && (
                                    <div className="flex items-start space-x-3">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-foreground">Address</p>
                                            <p className="text-sm text-muted-foreground capitalize">{user.address}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Account Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                                <Shield className="h-5 w-5 text-primary" />
                                <span>Account Information</span>
                            </h3>

                            <div className="space-y-3 pl-7">
                                <div className="flex items-start space-x-3">
                                    <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Status</p>
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${user.isActive === 'ACTIVE'
                                                ? 'bg-green-100 text-green-800 border border-green-200'
                                                : 'bg-red-100 text-red-800 border border-red-200'
                                                }`}
                                        >
                                            {user.isActive}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Key className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Authentication</p>
                                        {user.auths.map((auth, index) => (
                                            <div key={index} className="flex items-center space-x-2 mt-1">
                                                <span className="text-base">
                                                    {getProviderIcon(auth.provider)}
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {getProviderDisplayName(auth.provider)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">User ID</p>
                                        <p className="text-sm text-muted-foreground font-mono">
                                            {user._id}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium w-full mt-5">
                Change Password
            </button>
        </div>
    );
};

export default Profile;