import data from "../data.json";
import _ from "lodash";

export async function GET(req) {
  // Étape 1 : Trier les données par date
  const sortedData = _.sortBy(data, (entry) => new Date(entry.Date));

  // Initialiser les colonnes pour "Valeur totale portefeuille AVANT event" et "Valeur totale portefeuille APRES event"
  sortedData.forEach((entry, index) => {
    if (index === 0) {
      // Première ligne : "Valeur totale portefeuille AVANT event" égale à "User base_value_1D
      entry["Valeur totale portefeuille AVANT event"] =
        entry["User base_value_1D"]; // Utilisation de "User base_value_1D"

      entry["Flux de trésorerie (net_amount)"] = null; // NULL ou N/A pour la première ligne car pas de flux de tréso au départ

      entry["Valeur totale portefeuille APRES event"] = null; // NULL ou N/A pour la première ligne car pas de flux de tréso au départ
    } else if (index === 1) {
      // Seconde ligne : "Valeur totale portefeuille AVANT event" égale à celle de la première ligne
      entry["Valeur totale portefeuille AVANT event"] =
        sortedData[0]["Valeur totale portefeuille AVANT event"];
      // On effectue calcul différent à tout le reste car "Valeur totale portefeuille APRES event" n'existe pas encore en raison de l'absence de flux (event)
      entry["Valeur totale portefeuille APRES event"] =
        entry["Valeur totale portefeuille AVANT event"] +
        entry["Flux de trésorerie (net_amount)"];
    } else {
      // Lignes suivantes : "Valeur totale portefeuille AVANT event" égale à "Valeur totale portefeuille APRES event" de la ligne précédente
      entry["Valeur totale portefeuille AVANT event"] =
        sortedData[index - 1]["Valeur totale portefeuille APRES event"];

      // Calcul pour "Valeur totale portefeuille APRES event"
      entry["Valeur totale portefeuille APRES event"] =
        entry["Valeur totale portefeuille AVANT event"] +
        entry["Flux de trésorerie (net_amount)"];
    }
  });

  // Retourner les résultats sous forme de réponse JSON
  return new Response(JSON.stringify(sortedData), { status: 200 });
}
