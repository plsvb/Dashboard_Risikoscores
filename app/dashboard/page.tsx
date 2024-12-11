"use client";

import { useState, useEffect } from "react";
import { CVEData } from "../types/CVEData"; // Pfad anpassen
import CVEListItem from "../components/CVEListItem"; // CVEListItem-Komponente importieren
import DashboardTop from "../components/DashboardTop"; // DashboardTop-Komponente importieren
import DashboardBottom from "../components/DashboardBottom";
import Link from "next/link";



  useEffect(() => {
    // Lade gespeicherte IDs aus dem Local Storage
    const savedIds = JSON.parse(localStorage.getItem("savedCVEIds") || "[]");
    setSavedCVEIds(savedIds);

    // Lade die JSON-Datei mit fetch
    const fetchVulnerabilities = async () => {
      try {
        const response = await fetch("/nvdcve-1.1-2024.json"); // JSON-Datei aus dem public-Ordner laden
        const data = await response.json();
        const filteredData = data.CVE_Items.filter((item: CVEData) =>
          savedIds.includes(item.cve.CVE_data_meta.ID)
        );
        setFilteredData(filteredData);
      } catch (error) {
        console.error("Fehler beim Laden der JSON-Datei:", error);
      }
    };

    fetchVulnerabilities();
  }, []);

  // Entfernen einer Schwachstelle
  const handleRemove = (id: string) => {
    const updatedIds = savedCVEIds.filter((savedId) => savedId !== id);
    setSavedCVEIds(updatedIds);
    setFilteredData(filteredData.filter((item) => item.cve.CVE_data_meta.ID !== id));
    localStorage.setItem("savedCVEIds", JSON.stringify(updatedIds));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800">Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">
          Hallo Susi, hier ist der aktuelle Stand deiner Schwachstellen.
        </p>
      </header>

      {/* DashboardTop-Komponente */}
      <DashboardTop />

      {/* Gemerkte Schwachstellen */}
      <section className="mt-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Gemerkte Schwachstellen</h2>
        <p className="text-md text-gray-600 mb-6">
  Eine Übersicht aller gespeicherten Schwachstellen und deren Details. Besuche die{' '}
  <Link
    href="/"
    className="text-blue-500 hover:underline"
  >
    Schwachstellen-Datenbank
  </Link>{' '}
  um Schwachstellen zu deinen Projekt hinzuzufügen.
</p>

        {filteredData.length > 0 ? (
          <ul className="space-y-6">
            {filteredData.map((item) => (
              <CVEListItem
                key={item.cve.CVE_data_meta.ID}
                item={item}
                isSaved={true}
                onToggleSave={(id) => handleRemove(id)}
                onToggleDetails={(id) =>
                  console.log(`Detailansicht für Schwachstelle ${id}`)
                }
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-gray-500 mt-6">
            Du hast noch keine Schwachstellen gespeichert.
          </p>
        )}
      </section>
      <DashboardBottom />
    </div>
  );
}
