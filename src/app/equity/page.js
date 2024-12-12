"use client";

import { useEffect, useState } from "react";

const EquityPage = () => {
  const [equityData, setEquityData] = useState([]);
  const [twr, setTwr] = useState(null);

  useEffect(() => {
    const fetchEquityData = async () => {
      const response = await fetch("/api/equity");
      const result = await response.json();
      setEquityData(result.data);
      setTwr(result.twr);
    };
    fetchEquityData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Calcul TWR</h1>
      <div className="overflow-x-auto mb-6">
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
              <th className="border border-gray-300 px-4 py-2 text-right">
                Rendement
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                1 + Rendement
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
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {row["Rendement"] !== null
                    ? (row["Rendement"] * 100).toFixed(2) + "%"
                    : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {row["1 + Rendement"] !== null
                    ? row["1 + Rendement"].toFixed(2)
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {twr && (
        <div className="text-center font-semibold text-lg mt-4">
          TWR depuis la création du compte : {(twr.TWR * 100).toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default EquityPage;
