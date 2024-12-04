import React, { useState, useEffect } from "react";

export default function CVEListItem({
  item,
  isExpanded,
  onClick,
}: {
  item: any;
  isExpanded: boolean;
  onClick: () => void;
}) {
  const [scores, setScores] = useState({
    CVSS: 0,
    EPSS: 0,
    SSVC: 0,
    VPR: 0,
    combined: 0,
  });

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
    <li
      onClick={onClick}
      className={`border p-4 rounded shadow transition-all cursor-pointer ${
        isExpanded ? "bg-gray-100" : "bg-white"
      }`}
    >
      {/* Header */}
      <h3 className="font-bold text-lg text-center sm:text-left">
        {item.cve.CVE_data_meta.ID}
      </h3>
      <p className="text-sm mt-2 text-gray-700 text-center sm:text-left">
        {item.cve.description.description_data[0]?.value || "No description available"}
      </p>

      {/* Scores */}
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

      {/* Erweiterte Informationen */}
      {isExpanded && (
        <div className="mt-4">
          {/* Impact Details */}
          <h4 className="text-lg font-semibold">Impact Details</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>
              <strong>Severity:</strong>{" "}
              {item.impact?.baseMetricV3?.cvssV3?.baseSeverity || "N/A"}
            </li>
            <li>
              <strong>Score:</strong>{" "}
              {item.impact?.baseMetricV3?.cvssV3?.baseScore || "N/A"}
            </li>
            <li>
              <strong>Attack Vector:</strong>{" "}
              {item.impact?.baseMetricV3?.cvssV3?.attackVector || "N/A"}
            </li>
          </ul>

          {/* References */}
          <h4 className="text-lg font-semibold mt-4">References</h4>
          <ul className="list-disc list-inside text-sm text-blue-500 space-y-1">
            {item.cve.references.reference_data.map((ref: any, index: number) => (
              <li key={index}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words hover:underline"
                >
                  {ref.name || ref.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
