"use client";

import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CVEList from "./components/CVEList";
import { CVEData } from "./types/CVEData"; // Pfad anpassen
import mockData from "../public/nvdcve-1.1-2024.json";

export default function Home() {
  const [filteredData, setFilteredData] = useState<CVEData[]>(mockData.CVE_Items || []);
  const [vendors, setVendors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedCVEIds, setSavedCVEIds] = useState<string[]>([]);
  const resultsPerPage = 20;

  useEffect(() => {
    const vendorList = Array.from(
      new Set(
        mockData.CVE_Items.flatMap((item: CVEData) =>
          item.configurations.nodes.flatMap((node) =>
            node.cpe_match.map((cpe) => cpe.cpe23Uri.split(":")[3])
          )
        )
      )
    );
    setVendors(vendorList);
  }, []);

  useEffect(() => {
    // Lade die gespeicherten CVEs aus dem Local Storage
    const savedIds = JSON.parse(localStorage.getItem("savedCVEIds") || "[]");
    setSavedCVEIds(savedIds);
  }, []);

  useEffect(() => {
    // Speichere die Merkliste im Local Storage
    localStorage.setItem("savedCVEIds", JSON.stringify(savedCVEIds));
  }, [savedCVEIds]);

  const handleSearch = (query: { keyword: string; vendor: string }) => {
    const { keyword, vendor } = query;

    const results = mockData.CVE_Items.filter((item: CVEData) => {
      const matchesKeyword =
        item.cve.CVE_data_meta.ID.includes(keyword) ||
        item.cve.description.description_data.some((desc) =>
          desc.value.includes(keyword)
        );

      const matchesVendor = vendor
        ? item.configurations.nodes.some((node) =>
            node.cpe_match.some((cpe) => cpe.cpe23Uri.includes(vendor))
          )
        : true;

      return matchesKeyword && matchesVendor;
    });

    setFilteredData(results);
    setCurrentPage(1);
  };

  // Definition von onToggleSave
  const onToggleSave = (id: string) => {
    setSavedCVEIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((savedId) => savedId !== id)
        : [...prevIds, id]
    );
  };

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / resultsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Risikoscore Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">
          Willkommen beim Risikoscore Dashboard! Nutzen Sie die Suchfunktion,
          um Sicherheitslücken anhand von Schlüsselwörtern, IDs oder Vendoren
          zu finden. Blättern Sie durch die Ergebnisse, um detaillierte
          Informationen zu erhalten.
        </p>
      </header>

      <SearchBar onSearch={handleSearch} vendors={vendors} />
      <CVEList
        items={currentData}
        savedCVEIds={savedCVEIds}
        onToggleSave={onToggleSave}
      />

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
