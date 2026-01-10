import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  FolderOpen, 
  Briefcase, 
  Award, 
  Trophy, 
  Users, 
  Settings, 
  LogOut,
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Projects", url: "/dashboard/projects", icon: FolderOpen },
  { title: "Experience", url: "/dashboard/experience", icon: Briefcase },
  { title: "Certifications", url: "/dashboard/certifications", icon: Award },
  { title: "Awards", url: "/dashboard/awards", icon: Trophy },
  { title: "Organizations", url: "/dashboard/organizations", icon: Users },
  { title: "Profile", url: "/dashboard/profile", icon: User },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/20 text-primary font-medium" : "hover:bg-card-glass/60";

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar>
      <SidebarContent className="glass border-r border-card-border">
        <div className="p-4">
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3"}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-foreground">Portfolio</h2>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <div className="mt-auto p-4 border-t border-card-border">
          {!isCollapsed && (
            <div className="mb-4">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Portfolio Owner</p>
            </div>
          )}
          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "sm"}
            onClick={handleSignOut}
            className="w-full justify-start hover:bg-red-500/20 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}