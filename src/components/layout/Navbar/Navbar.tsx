/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Menu, X, Home, Search, MapPin, HelpCircle, LayoutDashboard, PackagePlus } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { ModeToggle } from "../ModeToggler";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/authApi";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import { toast } from "sonner";

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: "Home", path: "/", icon: Home },
        { name: "About", path: "/about", icon: HelpCircle },
        { name: "Contact", path: "/contact", icon: MapPin },
        { name: "Tracking", path: "/track-parcel", icon: Search },
    ];

    const { data, isLoading } = useUserInfoQuery(undefined);
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const dashboardPaths = ['/common-user', '/user', '/admin', '/receiver', '/sender'];

    const isDashboard = dashboardPaths.some(path =>
        location.pathname.startsWith(path)
    );

    if (isDashboard) {
        return null;
    }

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

    const user = data?.data;
    let dashboardLink: { name: string; path: string; icon: any } | null = null;

    if (user?.role?.includes(role.superAdmin) || user?.role?.includes(role.admin)) {
        dashboardLink = { name: "Dashboard", path: "/admin", icon: LayoutDashboard };
    } else if (user?.role?.includes(role.sender) && user?.role?.includes(role.receiver)) {
        dashboardLink = { name: "Dashboard", path: "/common-user", icon: LayoutDashboard };
    } else if (user?.role?.includes(role.sender)) {
        dashboardLink = { name: "Dashboard", path: "/sender", icon: LayoutDashboard };
    } else if (user?.role?.includes(role.receiver)) {
        dashboardLink = { name: "Dashboard", path: "/receiver", icon: LayoutDashboard };
    } else if (user?.role?.includes(role.user)) {
        dashboardLink = { name: "Create Parcel", path: "/create-parcel", icon: PackagePlus };
    }

    return (
        <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section - Left */}
                    <div className="flex items-center flex-shrink-0">
                        <NavLink to="/" className="flex items-center">
                            <img src="/image.png" className="h-14 w-14 mr-3" alt="Logo" />
                            <span className="text-xl font-bold text-foreground">FAST BOX</span>
                        </NavLink>
                    </div>

                    {/* Center Navigation - Desktop */}
                    <div className="hidden lg:flex flex-1 justify-center">
                        <div className="flex items-center space-x-1">
                            {navLinks.map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                                                ? "text-primary bg-primary/10"
                                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                            }`
                                        }
                                    >
                                        <IconComponent className="h-4 w-4 mr-2" />
                                        {link.name}
                                    </NavLink>
                                );
                            })}
                            {/* Dashboard link for logged-in users */}
                            {dashboardLink && (
                                <NavLink
                                    to={dashboardLink.path}
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                        }`
                                    }
                                >
                                    <dashboardLink.icon className="h-4 w-4 mr-2" />
                                    {dashboardLink.name}
                                </NavLink>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Auth Buttons & Controls */}
                    <div className="flex items-center space-x-3 flex-shrink-0">
                        {/* Auth Buttons */}
                        <div className="hidden sm:flex items-center space-x-2">
                            {isLoading ? null : data?.data?.email ? (
                                <Button
                                    onClick={handleLogout}
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
                                >
                                    Sign Out
                                </Button>
                            ) : (
                                <>
                                    <NavLink
                                        to="/login"
                                        className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        Sign in
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
                                    >
                                        Register
                                    </NavLink>
                                </>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <ModeToggle />

                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t shadow-sm">
                            {navLinks.map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive
                                                ? "text-primary bg-primary/10"
                                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                            }`
                                        }
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <IconComponent className="h-5 w-5 mr-3" />
                                        {link.name}
                                    </NavLink>
                                );
                            })}
                            {dashboardLink && (
                                <NavLink
                                    to={dashboardLink.path}
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                        }`
                                    }
                                >
                                    <dashboardLink.icon className="h-4 w-4 mr-2" />
                                    {dashboardLink.name}
                                </NavLink>
                            )}

                            {/* Mobile Auth Buttons */}
                            <div className="pt-4 pb-2 border-t mt-4">
                                {isLoading ? null : data?.data?.email ? (
                                    <span className="block px-3 py-2 text-base font-medium text-foreground">
                                        {data.data.email}
                                    </span>
                                ) : (
                                    <>
                                        <NavLink
                                            to="/login"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Sign in
                                        </NavLink>
                                        <NavLink
                                            to="/register"
                                            className="block px-3 py-2 mt-2 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Register
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;