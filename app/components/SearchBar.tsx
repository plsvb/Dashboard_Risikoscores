import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: { keyword: string; vendor: string }) => void;
  vendors: string[];
}

export default function SearchBar({ onSearch, vendors }: SearchBarProps) {
  const [keyword, setKeyword] = useState("");
  const [vendor, setVendor] = useState("");

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Suche zum Beispiel nach Systemen die du verwendest"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <select
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
        className="border p-2 rounded w-full sm:w-auto"
      >
        <option value="">Filtern nach Softwareanbieteren</option>
        {vendors.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
      <button
        onClick={() => onSearch({ keyword, vendor })}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
      >
        Suche
      </button>
    </div>
  );
}
