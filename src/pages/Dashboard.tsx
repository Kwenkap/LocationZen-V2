import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Receipt, DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-heading text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Bienvenue ! Voici un aperçu de votre cité
            </p>
          </div>
          <Button className="gradient-primary hover:opacity-90 transition-opacity shadow-lg">
            <TrendingUp className="mr-2 h-4 w-4" />
            Générer un rapport
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Locataires"
            value="24"
            change="+12%"
            changeType="positive"
            icon={Users}
            iconColor="gradient-primary"
            delay={0}
          />
          <StatCard
            title="Factures en Attente"
            value="12"
            change="-8%"
            changeType="positive"
            icon={Receipt}
            iconColor="bg-accent"
            delay={100}
          />
          <StatCard
            title="Revenus du Mois"
            value="45,320 €"
            change="+23%"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-success"
            delay={200}
          />
          <StatCard
            title="Taux d'Occupation"
            value="92%"
            change="+5%"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-secondary"
            delay={300}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card className="animate-fade-in-up border-border/50" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Activités Récentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Jean Dupont", action: "Paiement reçu", amount: "850 €", status: "success" },
                { name: "Marie Martin", action: "Facture générée", amount: "920 €", status: "pending" },
                { name: "Pierre Durand", action: "Bail renouvelé", amount: "—", status: "info" },
                { name: "Sophie Bernard", action: "Paiement en retard", amount: "750 €", status: "warning" },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.action}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-foreground">{item.amount}</span>
                    <Badge 
                      variant={
                        item.status === "success" ? "default" :
                        item.status === "warning" ? "destructive" :
                        "secondary"
                      }
                      className={cn(
                        item.status === "success" && "bg-success hover:bg-success",
                        item.status === "pending" && "bg-accent hover:bg-accent",
                        item.status === "info" && "bg-secondary hover:bg-secondary",
                      )}
                    >
                      {item.status === "success" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {item.status === "warning" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {
                        item.status === "success" ? "Payé" :
                        item.status === "warning" ? "Retard" :
                        item.status === "pending" ? "En attente" :
                        "Info"
                      }
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="animate-fade-in-up border-border/50" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Actions Rapides
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button 
                variant="outline" 
                className="justify-start h-auto py-4 hover-lift border-border/50"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm">Ajouter un Locataire</p>
                    <p className="text-xs text-muted-foreground">Enregistrer un nouveau locataire</p>
                  </div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start h-auto py-4 hover-lift border-border/50"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Receipt className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm">Créer une Facture</p>
                    <p className="text-xs text-muted-foreground">Générer une nouvelle facture</p>
                  </div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start h-auto py-4 hover-lift border-border/50"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm">Enregistrer un Paiement</p>
                    <p className="text-xs text-muted-foreground">Marquer une facture comme payée</p>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start h-auto py-4 hover-lift border-border/50"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm">Voir les Statistiques</p>
                    <p className="text-xs text-muted-foreground">Analyser les performances</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
