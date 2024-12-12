"use client";

import { useEffect, useState } from "react";

const EquityPage = () => {
  const [equityData, setEquityData] = useState([]);

  useEffect(() => {
    const fetchEquityData = async () => {
      const response = await fetch("/api/equity");
      const data = await response.json();
      setEquityData(data);
    };
    fetchEquityData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Calcul de l'Équity
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Type d'Activité
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Sens Flux de Tréso
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                Flux de trésorerie (net_amount)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                Valeur totale portefeuille AVANT event
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                Valeur totale portefeuille APRES event
              </th>
            </tr>
          </thead>
          <tbody>
            {equityData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-300 px-4 py-2">{row.Date}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {row["Type d'Activité (activity_type)"]}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row["Sens Flux de Tréso"]}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {row["Flux de trésorerie (net_amount)"] !== null
                    ? row["Flux de trésorerie (net_amount)"].toFixed(2)
                    : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {row["Valeur totale portefeuille AVANT event"] !== null
                    ? row["Valeur totale portefeuille AVANT event"].toFixed(2)
                    : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {row["Valeur totale portefeuille APRES event"] !== null
                    ? row["Valeur totale portefeuille APRES event"].toFixed(2)
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquityPage;
