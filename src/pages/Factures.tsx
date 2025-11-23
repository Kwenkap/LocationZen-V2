import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Receipt, 
  Plus, 
  Search, 
  Download,
  Eye,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";

const mockInvoices = [
  { 
    id: "INV-2024-001", 
    tenant: "Jean Dupont",
    property: "Appartement 3A",
    amount: "850 €",
    dueDate: "01/02/2024",
    status: "paid",
    paidDate: "28/01/2024"
  },
  { 
    id: "INV-2024-002", 
    tenant: "Marie Martin",
    property: "Studio 1B",
    amount: "920 €",
    dueDate: "05/02/2024",
    status: "pending",
    paidDate: null
  },
  { 
    id: "INV-2024-003", 
    tenant: "Pierre Durand",
    property: "T2 - 5C",
    amount: "1,100 €",
    dueDate: "10/02/2024",
    status: "pending",
    paidDate: null
  },
  { 
    id: "INV-2024-004", 
    tenant: "Sophie Bernard",
    property: "T3 - 2D",
    amount: "750 €",
    dueDate: "15/01/2024",
    status: "overdue",
    paidDate: null
  },
  { 
    id: "INV-2024-005", 
    tenant: "Luc Petit",
    property: "Studio 4E",
    amount: "680 €",
    dueDate: "20/02/2024",
    status: "draft",
    paidDate: null
  },
];

const Factures = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "overdue":
        return <XCircle className="h-4 w-4" />;
      case "draft":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "Payée";
      case "pending":
        return "En attente";
      case "overdue":
        return "En retard";
      case "draft":
        return "Brouillon";
      default:
        return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      case "draft":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-heading text-foreground mb-2">
              Factures
            </h1>
            <p className="text-muted-foreground">
              Gérez vos {mockInvoices.length} factures
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button className="gradient-primary hover:opacity-90 transition-opacity shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Créer une facture
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payées</p>
                  <p className="text-2xl font-bold text-success">
                    {mockInvoices.filter(i => i.status === "paid").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">En attente</p>
                  <p className="text-2xl font-bold text-accent">
                    {mockInvoices.filter(i => i.status === "pending").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <XCircle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">En retard</p>
                  <p className="text-2xl font-bold text-destructive">
                    {mockInvoices.filter(i => i.status === "overdue").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Brouillons</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockInvoices.filter(i => i.status === "draft").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher une facture..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                Filtrer par statut
              </Button>
              <Button variant="outline">
                Trier par date
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border/50 bg-muted/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Numéro
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Locataire
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Propriété
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Montant
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Échéance
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {mockInvoices.map((invoice, i) => (
                    <tr 
                      key={invoice.id}
                      className="hover:bg-muted/20 transition-colors animate-fade-in-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-primary">
                          {invoice.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-foreground">
                          {invoice.tenant}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">
                          {invoice.property}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-foreground">
                          {invoice.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">
                          {invoice.dueDate}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant={getStatusVariant(invoice.status)}
                          className={`flex items-center gap-1 w-fit ${
                            invoice.status === "paid" ? "bg-success hover:bg-success text-white" :
                            invoice.status === "pending" ? "bg-accent hover:bg-accent text-white" :
                            ""
                          }`}
                        >
                          {getStatusIcon(invoice.status)}
                          {getStatusLabel(invoice.status)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Factures;
