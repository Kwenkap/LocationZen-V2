import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Receipt, DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard = () => {
  const [locataires, setLocataires] = useState<any[]>([]);

  // Récupération des locataires
  useEffect(() => {
    const fetchLocataires = async () => {
      try {
        const response = await axios.get("http://localhost:5000/locataire");
        setLocataires(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des locataires:", error);
      }
    };
    fetchLocataires();
  }, []);

  // Calcul des indicateurs
  const chambres = locataires.filter(l => l.logement === "chambre" && l.statut);
  const studios = locataires.filter(l => l.logement === "studio" && l.statut);

  const loyersEnRetard = locataires.filter(l => {
    const now = new Date();
    const dateFin = new Date(l.dateFin);
    return dateFin < now;
  });

  const facturesNonConfirmees = locataires.filter(
    l => l.facture && !l.facture.confirme && l.statut
  );

  const deuxMoisAvantDateFin = new Date();
  deuxMoisAvantDateFin.setMonth(deuxMoisAvantDateFin.getMonth() + 2);

  const locatairesAvecDateFinDans2Mois = locataires.filter(l => {
    const dateFin = new Date(l.dateFin);
    return dateFin >= new Date() && dateFin <= deuxMoisAvantDateFin;
  });

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
            value={locataires.length.toString()}
            change="+12%"
            changeType="positive"
            icon={Users}
            iconColor="gradient-primary"
            delay={0}
          />
          <StatCard
            title="Factures en Attente"
            value={facturesNonConfirmees.length.toString()}
            change="-8%"
            changeType="positive"
            icon={Receipt}
            iconColor="bg-accent"
            delay={100}
          />
          <StatCard
            title="Loyers en Retard"
            value={loyersEnRetard.length.toString()}
            change="+5%"
            // changeType="warning"
            icon={AlertCircle}
            iconColor="bg-destructive"
            delay={200}
          />
          <StatCard
            title="Baux expirant < 2 mois"
            value={locatairesAvecDateFinDans2Mois.length.toString()}
            change="+3%"
            // changeType="warning"
            icon={TrendingUp}
            iconColor="bg-secondary"
            delay={300}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
         {/* Activités Récentes */}
<Card className="animate-fade-in-up border-border/50" style={{ animationDelay: "400ms" }}>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <AlertCircle className="h-5 w-5 text-primary" />
      Activités Récentes
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {loyersEnRetard.map((locataire, i) => {
      // Calcul du montant à payer (loyer × 3)
      const montantAPayer = locataire.montantLoyer ? locataire.montantLoyer * 3 : 0;

      return (
        <div
          key={i}
          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <div className="flex-1">
            <p className="font-medium text-sm text-foreground">{locataire.noms}</p>
            <p className="text-xs text-muted-foreground">Paiement en retard</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground">
              {montantAPayer.toLocaleString("fr-FR")} FCFA
            </span>
            <Badge
              variant="destructive"
              className="bg-destructive hover:bg-destructive"
            >
              <AlertCircle className="h-3 w-3 mr-1" />
              À payer
            </Badge>
          </div>
        </div>
      );
    })}
  </CardContent>
</Card>


          {/* Alertes */}
          <Card className="animate-fade-in-up border-border/50" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Alertes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                🔴 Loyers en retard : <span className="font-bold">{loyersEnRetard.length}</span>
              </p>
              <p className="text-sm">
                🟠 Factures non confirmées : <span className="font-bold">{facturesNonConfirmees.length}</span>
              </p>
              <p className="text-sm">
                🟡 Baux expirant dans 2 mois : <span className="font-bold">{locatairesAvecDateFinDans2Mois.length}</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
