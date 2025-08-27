/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bell, HelpCircle, Home, LucideLogOut, MapPin, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authApi, useLogoutMutation, useUserInfoQuery } from '@/redux/features/authApi';
import { ModeToggle } from '../layout/ModeToggler';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { NavLink, useNavigate } from 'react-router';
import { role } from '@/constants/role';
import { toast } from 'sonner';
import { useAppDispatch } from '@/redux/hook';
import LoadingPage from '../layout/loading';

export function DashboardHeader() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) {
        return <LoadingPage></LoadingPage>;
    }

    const navLinks = [
        { name: "Home", path: "/", icon: Home },
        { name: "About", path: "/about", icon: HelpCircle },
        { name: "Contact", path: "/contact", icon: MapPin },
    ];

    const user = data?.data;
    const userName = user?.name?.split(" ")[0];
    let profile = user?.picture;


    if (profile) {
        profile = profile.replace(/=[^/]+$/, "");
    }

    const getInitials = (fullName?: string) => {
        if (!fullName) return "UN";
        return fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleLogout = async () => {
        try {
            const res = await logout(undefined).unwrap();
            if (res.success) {
                toast.success("Logged out successfully!");
            }
            dispatch(authApi.util.resetApiState());
        } catch (err: any) {
            toast.error(err?.data?.message || "Logout failed!");
        }
    };


    return (
        <div className="flex flex-1 items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-foreground capitalize">
                    Dashboard
                </h2>
                <p className="text-sm text-muted-foreground">Welcome back, {userName}</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative space-x-2">
                    <Button variant="outline" size="icon" className="relative">
                        <Bell className="w-4 h-4" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </Button>
                    <ModeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-[1.2rem] w-[1.2rem]" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            {navLinks.map((link) => (
                                <DropdownMenuItem key={link.path} asChild>
                                    <NavLink to={link.path} className="flex items-center gap-2">
                                        <link.icon className="w-4 h-4" />
                                        <span>{link.name}</span>
                                    </NavLink>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem asChild className='w-full'>
                                <button onClick={handleLogout}>
                                    <LucideLogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <button
                    onClick={() => {
                        if (user?.role?.includes(role.sender) && user?.role?.includes(role.receiver)) {
                            navigate("/common-user/profile");
                        } else if (user?.role?.includes(role.sender)) {
                            navigate("/sender/profile");
                        } else if (user?.role?.includes(role.receiver)) {
                            navigate("/receiver/profile");
                        } else if (
                            user?.role?.includes(role.admin) ||
                            user?.role?.includes(role.superAdmin)
                        ) {
                            navigate("/admin/profile");
                        } else {
                            navigate("/");
                        }
                    }}
                >
                    <Avatar>
                        {profile ? (
                            <AvatarImage
                                src={profile}
                                alt={userName ?? "User profile"}
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                        )}
                    </Avatar>
                </button>
            </div>
        </div>
    );
}