import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
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

const Factures = () => {
  const [data, setData] = useState([]);
  const [totalMontant, setTotalMontant] = useState(0);

  // Récupérer les données de l'API au montage
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/locataire');
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des locataires :", error);
      }
    }
    fetchData();
  }, []);

  // Calculer le montant total à chaque modification des données
  useEffect(() => {
    let total = 0;
    data.forEach((row) => {
      if (row.total) {
        total += row.total;
      }
    });
    setTotalMontant(total);
  }, [data]);

  // Mettre à jour le montant total pour une ligne spécifique lors de la saisie du nouvel index
  function handleNouvelleIndexChange(row, nouvelleIndex) {
    const ancienIndex = Number(row.factures?.[row.factures.length - 1]?.nouveauIndex) || 0;
    const quantite = Number(nouvelleIndex) - ancienIndex;
    const qwt = 125;
    const total = (quantite * qwt) + 2000 + 200;

    const updatedRow = { ...row, nouvelleIndex: Number(nouvelleIndex), quantite, total };
    const updatedData = [...data];
    const rowIndex = updatedData.indexOf(row);
    updatedData[rowIndex] = updatedRow;
    setData(updatedData);
  }

  // Sauvegarder la facture pour chaque locataire
  async function saveData() {
    try {
      for (const locataire of data) {
        const ancienIndex = Number(locataire.factures?.[locataire.factures.length - 1]?.nouveauIndex) || 0;
        const date = new Date();
        const nouveauIndex = locataire.nouvelleIndex;
        const factureTotal = locataire.total;
        const response = await axios.post(`http://localhost:5000/locataire/${locataire._id}`, { date, ancienIndex, nouveauIndex, factureTotal });
        const updatedLocataire = response.data;
        const updatedData = [...data];
        const rowIndex = updatedData.findIndex(row => row._id === updatedLocataire._id);
        updatedData[rowIndex] = updatedLocataire;
        setData(updatedData);
      }
    } catch (error) {
      console.error(`Erreur lors de l'enregistrement des données : ${error.message}`);
    }
  }

  // Télécharger la page en PDF
  function handleDownload() {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1189, 841]
    });

    let dataForPdf = [];

    data.forEach((row) => {
      let newRow = [
        row.numeroLogement,
        row.noms,
        row.telephone,
        Number(row.factures?.[row.factures.length - 1]?.nouveauIndex) || "",
        Number(row.nouvelleIndex) || "",
        row.quantite || "",
        "125",
        "2000",
        row.total || ""
      ];
      dataForPdf.push(newRow);
    });

    dataForPdf.push(["","", "", "", "", "","","total Facture", totalMontant  ]);

/*     doc.autoTable({
      head: [['N° Logement', 'Locataire', 'Téléphone', 'Ancien Index', 'Nouvel Index', 'Quantité', 'Prix Unitaire', 'Frais Fixe', 'Total']],
      body: dataForPdf,
      startY: 50,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [220, 220, 220] },
    }); */

    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    const fileName = `facturation (${dateString}).pdf`;

    doc.save(fileName);
  }

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
              Gérez vos {data.length} factures
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Exporter PDF
            </Button>
            <Button className="gradient-primary hover:opacity-90 transition-opacity shadow-lg" onClick={saveData}>
              <Plus className="mr-2 h-4 w-4" />
              Créer une facture
            </Button>
          </div>
        </div>

        {/* Tableau des factures */}
        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border/50 bg-muted/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">N° Logement</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Locataire</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Téléphone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Ancien Index</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nouvel Index</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Quantité</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {data.map((row, i) => (
                    <tr key={row._id || i}>
                      <td className="px-6 py-4">{row.numeroLogement}</td>
                      <td className="px-6 py-4">{row.noms}</td>
                      <td className="px-6 py-4">{row.telephone}</td>
                      <td className="px-6 py-4">{Number(row.factures?.[row.factures.length - 1]?.nouveauIndex) || ""}</td>
                      <td className="px-6 py-4">
                        <Input
                          type="number"
                          value={row.nouvelleIndex || ""}
                          onChange={e => handleNouvelleIndexChange(row, e.target.value)}
                          className="w-24"
                        />
                      </td>
                      <td className="px-6 py-4">{row.quantite || ""}</td>
                      <td className="px-6 py-4 font-bold">{row.total || ""} FCFA</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-right font-bold">Total Facture</td>
                    <td className="px-6 py-4 font-bold">{totalMontant} FCFA</td>
                  </tr>
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
