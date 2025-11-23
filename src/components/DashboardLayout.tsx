import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="hover:bg-muted/50 transition-colors" />
              
              {/* Search Bar */}
              <div className="flex-1 max-w-xl relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher un locataire, facture..." 
                  className="pl-10 bg-muted/30 border-border/50 focus:bg-background transition-colors"
                />
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative hover:bg-muted/50">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-accent rounded-full animate-pulse" />
                </Button>
                
                <Avatar className="h-9 w-9 ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer">
                  <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
                    AD
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-auto p-6 scrollbar-thin">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
