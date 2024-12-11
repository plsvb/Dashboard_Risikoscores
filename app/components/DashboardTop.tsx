"use client";

import { useEffect, useState } from "react";
import { CVEData } from "../types/CVEData"; // Typdefinition anpassen

export default function DashboardTop() {
 // const [savedVulnerabilities, setSavedVulnerabilities] = useState<CVEData[]>([]);
  const [totalCombinedScore, setTotalCombinedScore] = useState<number>(0);
  const [securityStatus, setSecurityStatus] = useState<string>("");

  useEffect(() => {
    // Lade gespeicherte Schwachstellen aus Local Storage
    const savedIds = JSON.parse(localStorage.getItem("savedCVEIds") || "[]");

    const fetchVulnerabilities = async () => {
      try {
        const response = await fetch("/nvdcve-1.1-2024.json"); // JSON aus public
        const data = await response.json();
        const vulnerabilities = data.CVE_Items.filter((item: CVEData) =>
          savedIds.includes(item.cve.CVE_data_meta.ID)
        );

        setSavedVulnerabilities(vulnerabilities);

        // Berechne den totalCombinedScore
        const combinedScore = vulnerabilities.reduce((acc, item) => {
          const baseScore = item.impact?.baseMetricV3?.cvssV3?.baseScore || 0;
          return acc + baseScore;
        }, 0);
        setTotalCombinedScore(parseFloat(combinedScore.toFixed(2)));

        // Berechne den Sicherheitsstatus
        const criticalCount = vulnerabilities.filter(
          (item) => item.impact?.baseMetricV3?.cvssV3?.baseSeverity === "CRITICAL"
        ).length;
        const highCount = vulnerabilities.filter(
          (item) => item.impact?.baseMetricV3?.cvssV3?.baseSeverity === "HIGH"
        ).length;
        const mediumCount = vulnerabilities.filter(
          (item) => item.impact?.baseMetricV3?.cvssV3?.baseSeverity === "MEDIUM"
        ).length;
        const lowCount = vulnerabilities.filter(
          (item) => item.impact?.baseMetricV3?.cvssV3?.baseSeverity === "LOW"
        ).length;

        const statusText = `Es gibt derzeit ${vulnerabilities.length} Schwachstellen, ${criticalCount} davon sind schwerwiegend (CRITICAL), ${highCount} sind hoch (HIGH), ${mediumCount} sind mittel (MEDIUM), und ${lowCount} sind gering (LOW).`;
        setSecurityStatus(statusText);
      } catch (error) {
        console.error("Fehler beim Laden der JSON-Datei:", error);
      }
    };

    fetchVulnerabilities();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
      {/* Kachel: Total Combined Score */}
      <div className="bg-blue-500 text-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-2">Total Combined Score</h2>
        <p className="text-lg">{totalCombinedScore}</p>
      </div>

      {/* Kachel: Sicherheitsstatus */}
      <div className="bg-gray-100 text-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-2">Sicherheitsstatus</h2>
        <p className="text-sm">{securityStatus}</p>
      </div>
    </div>
  );
}
