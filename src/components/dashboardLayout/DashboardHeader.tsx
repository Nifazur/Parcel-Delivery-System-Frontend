import { Bell, HelpCircle, Home, MapPin, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserInfoQuery } from '@/redux/features/authApi';
import { ModeToggle } from '../layout/ModeToggler';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { NavLink } from 'react-router';



export function DashboardHeader() {




    const { data, isLoading } = useUserInfoQuery(undefined)

    if (isLoading) {
        <p>Loading...</p>
    }

    const navLinks = [
        { name: "Home", path: "/", icon: Home },
        { name: "About", path: "/about", icon: HelpCircle },
        { name: "Contact", path: "/contact", icon: MapPin },
    ];

    const userName = data?.data?.name?.split(" ")[0];
    const profile = data?.data?.picture;
    console.log(profile);
    

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
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Avatar>
                    {profile ? <AvatarImage src={profile} /> :
                    <AvatarFallback>UN</AvatarFallback>}
                </Avatar>
            </div>
        </div>
    );
}