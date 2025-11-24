import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Receipt, 
  Settings, 
  TrendingUp,
  Building2,
  Calendar
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
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
import { LocationsZenLogo } from "./LocationsZenLogo";
import { Badge } from "@/components/ui/badge";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, badge: null },
  { title: "Locataires", url: "/locataires", icon: Users, badge: "27" },
  { title: "Factures", url: "/factures", icon: Receipt, badge: "27" },
  { title: "Propriétés", url: "/proprietes", icon: Building2, badge: null },
];

const analyticsItems = [
  { title: "Statistiques", url: "/stats", icon: TrendingUp, badge: null },
  { title: "Calendrier", url: "/calendrier", icon: Calendar, badge: "3" },
  { title: "Rapports", url: "/rapports", icon: FileText, badge: null },
];

const settingsItems = [
  { title: "Paramètres", url: "/parametres", icon: Settings, badge: null },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const hasActiveItem = (items: typeof mainItems) => 
    items.some(item => isActive(item.url));

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <LocationsZenLogo collapsed={collapsed} />

      <SidebarContent className="px-2">
        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs font-semibold tracking-wider uppercase px-3">
              Principal
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={collapsed ? item.title : undefined}
                  >
                    <NavLink 
                      to={item.url} 
                      className={`
                        group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-200 hover:bg-sidebar-accent
                        ${isActive(item.url) 
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                          : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
                        }
                      `}
                    >
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? 'text-sidebar-primary-foreground' : ''}`} />
                      {!collapsed && (
                        <>
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant="secondary" 
                              className={`
                                ml-auto text-xs
                                ${isActive(item.url) 
                                  ? 'bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground' 
                                  : 'bg-accent/10 text-accent'
                                }
                              `}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                      {isActive(item.url) && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sidebar-primary-foreground rounded-r-full" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs font-semibold tracking-wider uppercase px-3 mt-4">
              Analytiques
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={collapsed ? item.title : undefined}
                  >
                    <NavLink 
                      to={item.url} 
                      className={`
                        group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-200 hover:bg-sidebar-accent
                        ${isActive(item.url) 
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                          : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
                        }
                      `}
                    >
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? 'text-sidebar-primary-foreground' : ''}`} />
                      {!collapsed && (
                        <>
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant="secondary" 
                              className={`
                                ml-auto text-xs
                                ${isActive(item.url) 
                                  ? 'bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground' 
                                  : 'bg-warning/10 text-warning'
                                }
                              `}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                      {isActive(item.url) && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sidebar-primary-foreground rounded-r-full" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={collapsed ? item.title : undefined}
                  >
                    <NavLink 
                      to={item.url} 
                      className={`
                        group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-200 hover:bg-sidebar-accent
                        ${isActive(item.url) 
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                          : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
                        }
                      `}
                    >
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? 'text-sidebar-primary-foreground' : ''}`} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                      {isActive(item.url) && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sidebar-primary-foreground rounded-r-full" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
