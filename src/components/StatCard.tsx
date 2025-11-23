import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon: Icon,
  iconColor = "bg-primary",
  delay = 0
}: StatCardProps) => {
  return (
    <Card 
      className="hover-lift overflow-hidden animate-fade-in-up border-border/50"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-3xl font-bold font-heading text-foreground mb-2">
              {value}
            </h3>
            {change && (
              <div className="flex items-center gap-1">
                <span 
                  className={cn(
                    "text-xs font-semibold",
                    changeType === "positive" && "text-success",
                    changeType === "negative" && "text-destructive",
                    changeType === "neutral" && "text-muted-foreground"
                  )}
                >
                  {change}
                </span>
                <span className="text-xs text-muted-foreground">vs mois dernier</span>
              </div>
            )}
          </div>
          
          <div className={cn(
            "p-3 rounded-xl shadow-lg",
            iconColor
          )}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
