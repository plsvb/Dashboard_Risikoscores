import React, { useState, useEffect } from "react";
import { CVEData } from "../types/CVEData"; // Pfad anpassen

export default function CVEListItem({
  item,
  isSaved,
  onToggleSave,
}: {
  item: CVEData;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}) {
  const [scores, setScores] = useState({
    CVSS: 0,
    EPSS: 0,
    SSVC: 0,
    VPR: 0,
    combined: 0,
  });
  const [isExpanded, setIsExpanded] = useState(false); // Zustand für die Detailansicht

  useEffect(() => {
    const fetchScores = async () => {
      const randomScores = {
        CVSS: parseFloat((Math.random() * 10).toFixed(2)),
        EPSS: parseFloat((Math.random() * 1).toFixed(2)),
        SSVC: parseFloat((Math.random() * 5).toFixed(2)),
        VPR: parseFloat((Math.random() * 10).toFixed(2)),
        combined: 0,
      };

      randomScores.combined = parseFloat(
        (
          (randomScores.CVSS +
            randomScores.EPSS * 10 +
            randomScores.SSVC * 2 +
            randomScores.VPR) /
          4
        ).toFixed(2)
      );

      setScores(randomScores);
    };

    fetchScores();
  }, []);

  const tooltips = {
    CVSS: "Common Vulnerability Scoring System - misst die Schwere von Sicherheitslücken.",
    EPSS: "Exploit Prediction Scoring System - bewertet die Wahrscheinlichkeit eines Exploits.",
    SSVC: "Stakeholder-Specific Vulnerability Categorization - priorisiert nach Stakeholder-Interessen.",
    VPR: "Vulnerability Priority Rating - kombiniert Risiko und Ausnutzbarkeit.",
    combined: "Durchschnitt aller Scores für eine Gesamtbewertung.",
  };

  return (
    <li className="border p-4 rounded shadow bg-white">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{item.cve.CVE_data_meta.ID}</h3>
        <button
          onClick={() => onToggleSave(item.cve.CVE_data_meta.ID)}
          className={`px-3 py-1 rounded text-sm ${
            isSaved ? "bg-red-500 text-white" : "bg-green-300 text-black"
          }`}
        >
          {isSaved ? "Von Merkliste entfernen" : "Zu Merkliste hinzufügen"}
        </button>
      </div>
      <p className="text-sm mt-2 text-gray-700">
        {item.cve.description.description_data[0]?.value || "No description available"}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {Object.entries(scores).map(([key, value]) => (
          <div key={key} className="text-center group relative">
            <p className="text-sm font-bold">{key}</p>
            <p className="text-lg">{value}</p>
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {tooltips[key as keyof typeof tooltips]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => setIsExpanded((prev) => !prev)} // Umschalten der Detailansicht
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded"
        >
          {isExpanded ? "Detailansicht schließen" : "Detailansicht"}
        </button>
      </div>

      {/* Detailansicht */}
      {isExpanded && (
        <div className="mt-4 bg-gray-100 p-4 rounded shadow">
          <h4 className="text-lg font-semibold">Zusätzliche Details</h4>
          <ul className="list-disc pl-4 text-sm text-gray-800">
            <li>
              <strong>Schweregrad:</strong>{" "}
              {item.impact?.baseMetricV3?.cvssV3?.baseSeverity || "N/A"}
            </li>
            <li>
              <strong>Score:</strong>{" "}
              {item.impact?.baseMetricV3?.cvssV3?.baseScore || "N/A"}
            </li>
            <li>
              <strong>Angriffsvektor:</strong>{" "}
              {item.impact?.baseMetricV3?.cvssV3?.attackVector || "N/A"}
            </li>
            <li>
              <strong>Referenzen:</strong>
              <ul className="list-disc pl-4">
                {item.cve.references.reference_data.map((ref, index) => (
                  <li key={index}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {ref.name || ref.url}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
}
