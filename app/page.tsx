"use client";

import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CVEList from "./components/CVEList";
import mockData from "../public/nvdcve-1.1-2024.json";

export default function Home() {
  const [filteredData, setFilteredData] = useState(mockData.CVE_Items || []);
  const [vendors, setVendors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;

  useEffect(() => {
    const vendorList = Array.from(
      new Set(
        mockData.CVE_Items.flatMap((item) =>
          item.configurations.nodes.flatMap((node) =>
            node.cpe_match.map((cpe) => cpe.cpe23Uri.split(":")[3])
          )
        )
      )
    );
    setVendors(vendorList);
  }, []);

  const handleSearch = (query: { keyword: string; vendor: string }) => {
    const { keyword, vendor } = query;

    const results = mockData.CVE_Items.filter((item) => {
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
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Überschrift und Beschreibung */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Risikoscore Dashboard
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Willkommen beim <strong>Risikoscore Dashboard</strong>! Dieses Tool
          hilft Ihnen, Sicherheitslücken (CVEs) anhand verschiedener
          Bewertungssysteme zu analysieren und zu vergleichen.
        </p>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
          Nutzen Sie die <strong>Suchfunktion</strong>, um Schwachstellen anhand
          von Schlüsselwörtern, IDs oder Vendoren zu finden. Für jede
          Sicherheitslücke erhalten Sie Bewertungen wie:
        </p>
      </header>

      {/* Suchleiste */}
      <SearchBar onSearch={handleSearch} vendors={vendors} />

      {/* Ergebnisliste */}
      <CVEList items={currentData} />

      {/* Paginierung */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
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
        <p className="text-gray-700">
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
