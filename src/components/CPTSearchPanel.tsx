"use client";

import { useEffect, useState } from "react";

interface CPTRow {
  CPT_CODE: string;
  "SHORT_ DESCRIPTION": string;
}

interface CPTSearchPanelProps {
  onSelect: (code: string, desc: string) => void;
  onClose: () => void;
}

export default function CPTSearchPanel({ onSelect, onClose }: CPTSearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cptData, setCptData] = useState<CPTRow[]>([]);
  const [filteredResults, setFilteredResults] = useState<CPTRow[]>([]);

  // Load JSON using fetch (from public/data/cpt.json)
  useEffect(() => {
    fetch("/data/cpt.json")
      .then((res) => res.json())
      .then((data: CPTRow[]) => {
        setCptData(data);
      })
      .catch((err) => console.error("❌ Failed to load CPT data:", err));
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) return setFilteredResults([]);
    const results = cptData.filter((row) =>
      row["SHORT_ DESCRIPTION"].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results.slice(0, 10));
  }, [searchTerm, cptData]);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-blue-500 w-[90%] max-w-2xl shadow-lg rounded p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-blue-500 text-white px-3 py-1 rounded font-semibold">Search</span>
        <input
          type="text"
          className="border border-blue-500 px-4 py-2 w-full rounded shadow"
          placeholder="Search CPT ShortDesc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>

      <div className="max-h-80 overflow-y-auto text-sm">
        {filteredResults.map((item, i) => (
          <div
            key={i}
            className="p-2 border-b hover:bg-blue-50 cursor-pointer"
            onClick={() => {
              onSelect(item.CPT_CODE, item["SHORT_ DESCRIPTION"]);
              onClose();
            }}
          >
            <div className="text-gray-500 font-bold">{item.CPT_CODE}</div>
            <div className="text-gray-800">{item["SHORT_ DESCRIPTION"]}</div>
          </div>
        ))}
        {filteredResults.length === 0 && (
          <p className="text-gray-500 italic text-center">No matches found.</p>
        )}
      </div>

      <div className="text-right mt-4">
        <button
          onClick={onClose}
          className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
