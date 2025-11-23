import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  MoreVertical 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockTenants = [
  { 
    id: 1, 
    name: "Jean Dupont", 
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    property: "Appartement 3A",
    moveInDate: "01/01/2023",
    rentAmount: "850 €",
    status: "active",
    initials: "JD"
  },
  { 
    id: 2, 
    name: "Marie Martin", 
    email: "marie.martin@email.com",
    phone: "+33 6 23 45 67 89",
    property: "Studio 1B",
    moveInDate: "15/03/2023",
    rentAmount: "920 €",
    status: "active",
    initials: "MM"
  },
  { 
    id: 3, 
    name: "Pierre Durand", 
    email: "pierre.durand@email.com",
    phone: "+33 6 34 56 78 90",
    property: "T2 - 5C",
    moveInDate: "01/06/2022",
    rentAmount: "1,100 €",
    status: "active",
    initials: "PD"
  },
  { 
    id: 4, 
    name: "Sophie Bernard", 
    email: "sophie.bernard@email.com",
    phone: "+33 6 45 67 89 01",
    property: "T3 - 2D",
    moveInDate: "10/09/2023",
    rentAmount: "750 €",
    status: "late",
    initials: "SB"
  },
];

const Locataires = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-heading text-foreground mb-2">
              Locataires
            </h1>
            <p className="text-muted-foreground">
              Gérez vos {mockTenants.length} locataires
            </p>
          </div>
          <Button className="gradient-primary hover:opacity-90 transition-opacity shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un locataire
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher un locataire..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                Filtrer
              </Button>
              <Button variant="outline">
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tenants Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockTenants.map((tenant, i) => (
            <Card 
              key={tenant.id}
              className="hover-lift border-border/50 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                        {tenant.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {tenant.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tenant.property}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                {/* Status Badge */}
                <Badge 
                  variant={tenant.status === "active" ? "default" : "destructive"}
                  className={`mb-4 ${tenant.status === "active" ? "bg-success hover:bg-success" : ""}`}
                >
                  {tenant.status === "active" ? "Actif" : "Retard de paiement"}
                </Badge>

                {/* Contact Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground truncate">{tenant.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{tenant.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Depuis {tenant.moveInDate}</span>
                  </div>
                </div>

                {/* Rent Amount */}
                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Loyer mensuel</span>
                  <span className="text-xl font-bold font-heading text-primary">
                    {tenant.rentAmount}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for when there are no tenants */}
        {mockTenants.length === 0 && (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Users className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun locataire</h3>
              <p className="text-muted-foreground mb-6">
                Commencez par ajouter votre premier locataire
              </p>
              <Button className="gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un locataire
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Locataires;
