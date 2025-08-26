import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom"; // react-router v6+
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useUserInfoQuery } from "@/redux/features/authApi";

function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);
  const location = useLocation();

  const sidebarItems = getSidebarItems(userData?.data?.role);

  return (
    <Sidebar {...props} className="z-50">
      {/* Header */}
      <SidebarHeader className="items-center p-6 pt-2">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-12 h-12" src="/image.png" alt="Fast Box Logo" />
          <span className="text-2xl font-bold text-primary">Fast Box</span>
        </Link>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {sidebarItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "text-primary bg-primary/10"
                            : "hover:bg-accent"
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-2 w-full">
                          {item.icon && <item.icon className="w-4 h-4" />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

export default DashboardSidebar;