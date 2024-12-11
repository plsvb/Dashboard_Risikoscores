"use client";

import { useEffect, useState } from "react";
import { CVEData } from "../types/CVEData"; // Pfad anpassen

export default function DashboardBottom() {
  const [affectedSystems, setAffectedSystems] = useState<number>(0);
  const [attackVectors, setAttackVectors] = useState<Record<string, number>>({});
  //const [savedVulnerabilities, setSavedVulnerabilities] = useState<CVEData[]>([]);

  useEffect(() => {
    // Lade gespeicherte Schwachstellen aus dem Local Storage
    const savedIds = JSON.parse(localStorage.getItem("savedCVEIds") || "[]");

    const fetchVulnerabilities = async () => {
      try {
        const response = await fetch("/nvdcve-1.1-2024.json"); // JSON aus public
        const data = await response.json();
        const vulnerabilities = data.CVE_Items.filter((item: CVEData) =>
          savedIds.includes(item.cve.CVE_data_meta.ID)
        );

       // setSavedVulnerabilities(vulnerabilities);

        // Berechne betroffene Systeme
        const systems = new Set(
            vulnerabilities.flatMap((vul: any) =>
              vul.configurations.nodes.flatMap((node: any) =>
                node.cpe_match.map((cpe: any) => cpe.cpe23Uri)
              )
            )
          );
          
        setAffectedSystems(systems.size);

        // Berechne Angriffsvektoren
        const vectors = vulnerabilities.reduce((acc, vul) => {
          const vector = vul.impact?.baseMetricV3?.cvssV3?.attackVector || "Unknown";
          acc[vector] = (acc[vector] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setAttackVectors(vectors);
      } catch (error) {
        console.error("Fehler beim Laden der JSON-Datei:", error);
      }
    };

    fetchVulnerabilities();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {/* Kachel: Betroffene Systeme */}
      <div className="bg-blue-100 text-blue-800 p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-2">Betroffene Systeme</h3>
        <p className="text-3xl font-extrabold">{affectedSystems}</p>
        <p className="text-sm">Anzahl der betroffenen Systeme basierend auf den Konfigurationen.</p>
      </div>

      {/* Kachel: Angriffsvektoren */}
      <div className="bg-green-100 text-green-800 p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-2">Angriffsvektoren</h3>
        <ul className="text-sm space-y-1">
          {Object.entries(attackVectors).map(([vector, count]) => (
            <li key={vector} className="flex justify-between">
              <span>{vector}</span>
              <span>{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weitere Kacheln können hier ergänzt werden */}
      {/* Beispiel: Kritische Referenzen */}
      <div className="bg-red-100 text-red-800 p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-2">Kritische Referenzen</h3>
        <p className="text-sm">
          Eine Übersicht der externen Links und Ressourcen, die mit den Schwachstellen verbunden sind.
        </p>
      </div>
    </div>
  );
}
