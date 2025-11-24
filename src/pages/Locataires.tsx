import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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


const Locataires = () => {
  const [locataires, setLocataires] = useState([]);


  // ajouter un locataire
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    noms: "",
    prenoms: "",
    cni: "",
    logement: "",
    numeroLogement: "",
    telephone: "",
    dateDebut: "",
    dateFin: "",
    montantLoyer: "",
  });

  // Fonction d'ajout avec confirmation
  const handleSubmit = async () => {
    const confirmation = window.confirm("Voulez-vous vraiment ajouter ce locataire ?");
    if (!confirmation) return;

    try {
      await axios.post("http://localhost:5000/locataire", formData);
      alert("Locataire ajouté avec succès !");
      setOpen(false);
      setFormData({
        noms: "",
        prenoms: "",
        cni: "",
        logement: "",
        numeroLogement: "",
        telephone: "",
        dateDebut: "",
        dateFin: "",
        montantLoyer: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du locataire:", error);
      alert("Une erreur est survenue lors de l'ajout.");
    }
  };

  // Gestion des changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchLocataires = async () => {
      try {
        const response = await axios.get('http://localhost:5000/locataire');
        setLocataires(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocataires();
  }, []);

  function formatDate(date) {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  function sendMessageFacture(index) {
    const locataire = locataires[index];
    const phoneNumber = encodeURIComponent(locataire.telephone);
    const name = encodeURIComponent(locataire.noms);
    const factureTotal = Number(locataire.factures?.[locataire.factures.length - 1]?.factureTotal);
    const message = `Bonjour Mr/Mme ${name}, voici le montant de votre dernière facture : ${factureTotal} FCFA a payer dans un delai de 3 jours a compté de ce jour Merci`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

  function sendMessageBail(index) {
    const locataire = locataires[index];
    const phoneNumber = encodeURIComponent(locataire.telephone); 
    const name = encodeURIComponent(locataire.noms);
    const dateDebut = encodeURIComponent(locataire.dateDebut);
    const dateFin = encodeURIComponent(locataire.dateFin);
    const message = `Bonjour Mr/Mme ${name}, En gise de rappel votre contrat du ${dateDebut} prend fin ${dateFin}. Veillez s'il vous plait renouveler le contrat dans les brefs delais `;
    window.open(`https://wa.me/${'+237'+phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

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
              Gérez vos {locataires.length} locataires
            </p>
          </div>

          {/* ajouter un locataires */}

{/* Bouton qui ouvre le modal */}
      <Button
        className="gradient-primary hover:opacity-90 transition-opacity shadow-lg"
        onClick={() => setOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Ajouter un locataire
      </Button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un locataire</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Noms</Label>
              <Input name="noms" value={formData.noms} onChange={handleChange} />
            </div>
            <div>
              <Label>Prénoms</Label>
              <Input name="prenoms" value={formData.prenoms} onChange={handleChange} />
            </div>
            <div>
              <Label>CNI</Label>
              <Input name="cni" value={formData.cni} onChange={handleChange} />
            </div>
            <div>
              <Label>Logement</Label>
              <Input name="logement" value={formData.logement} onChange={handleChange} />
            </div>
            <div>
              <Label>Numéro Logement</Label>
              <Input name="numeroLogement" value={formData.numeroLogement} onChange={handleChange} />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input name="telephone" value={formData.telephone} onChange={handleChange} />
            </div>
            <div>
              <Label>Date d'entrée</Label>
              <Input type="date" name="dateEntree" value={formData.dateDebut} onChange={handleChange} />
            </div>
            <div>
              <Label>Date de fin</Label>
              <Input type="date" name="dateFin" value={formData.dateFin} onChange={handleChange} />
            </div>
            <div>
              <Label>Montant Loyer</Label>
              <Input type="number" name="loyer" value={formData.montantLoyer} onChange={handleChange} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button className="gradient-primary" onClick={handleSubmit}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
          {locataires.map((locataire, i) => (
            <Card 
              key={locataire.id}
              className="hover-lift border-border/50 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                        {locataire.initials || locataire.noms?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {locataire.noms}
                      </h3>
                      <h3>{locataire.numeroLogement}</h3>
                      <p className="text-sm text-muted-foreground">
                        {locataire.propriete}
                      </p>
                    </div>
                  </div>
                  <Button className="gradient-primary hover:opacity-90 transition-opacity shadow-lg">
                    <Plus className="mr-2 h-4 w-4" />
                       Modifier
                  </Button>
                </div>

                {/* Status Badge */}
                <Badge 
                  variant={locataire.status === "active" ? "default" : "destructive"}
                  className={`mb-4 ${locataire.status === "active" ? "bg-success hover:bg-success" : ""}`}
                >
                  {locataire.status === "active" ? "Actif" : "Retard de paiement"}
                </Badge>

                {/* Contact Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground truncate">{locataire.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{locataire.telephone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Depuis {formatDate(locataire.dateDebut)}</span> <br></br>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Depuis {formatDate(locataire.dateFin)}</span>
                  </div>
                </div>

                {/* Rent Amount */}
                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Loyer mensuel</span>
                  <span className="text-xl font-bold font-heading text-primary">
                    {locataire.montantLoyer} FCFA
                  </span>
                </div>
                {/* Boutons WhatsApp */}
                <div className="flex gap-2 mt-4">
                  <Button size="sm" onClick={() => sendMessageFacture(i)}>
                    Envoyer facture WhatsApp
                  </Button>
                  <Button size="sm" onClick={() => sendMessageBail(i)}>
                    Rappel fin de bail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for when there are no tenants */}
        {locataires.length === 0 && (
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
