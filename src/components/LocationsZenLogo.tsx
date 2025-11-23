import { Home } from "lucide-react";

interface LocationsZenLogoProps {
  collapsed?: boolean;
}

export const LocationsZenLogo = ({ collapsed = false }: LocationsZenLogoProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-6">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <div className="relative bg-gradient-primary p-2.5 rounded-xl shadow-lg">
          <Home className="h-6 w-6 text-white" />
        </div>
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-xl font-heading font-bold text-sidebar-foreground">
            LocationsZen
          </span>
          <span className="text-xs text-sidebar-foreground/60 font-medium">
            Gestion Locataires
          </span>
        </div>
      )}
    </div>
  );
};
