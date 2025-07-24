"use client";

import { useEffect, useState } from "react";
import { loadICDCodes } from "@/utils/loadICDCodes";

interface Entry {
  Code: string;
  ShortDesc: string;
  LongDesc: string;
}

interface ICDSearchPanelProps {
  onClose: () => void;
  onSelect: (entry: Entry) => void;
}

export default function ICDSearchPanel({ onClose, onSelect }: ICDSearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [icdData, setIcdData] = useState<Entry[]>([]);

  useEffect(() => {
    loadICDCodes().then((data) => {
      console.log("✅ ICDs loaded:", data);
      setIcdData(data);
    });
  }, []);

  const filtered = icdData.filter((entry) =>
    entry.ShortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.LongDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-green-700 w-[90%] max-w-2xl shadow-lg rounded p-4">
      {/* Search bar */}
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-green-700 text-white px-3 py-1 rounded font-semibold">Search</span>
        <input
          type="text"
          className="border border-green-700 px-4 py-2 w-full rounded shadow"
          placeholder="Search ICD ShortDesc or LongDesc..."
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Results */}
      <div className="max-h-80 overflow-y-auto text-sm">
        {filtered.map((entry, i) => (
          <div
            key={i}
            className="p-2 border-b hover:bg-green-50 cursor-pointer"
            onClick={() => {
              console.log("👉 ICD selected:", entry);
              onSelect(entry);
              onClose();
            }}
          >
            <div className="text-gray-500 font-bold">{entry.Code}</div>
            <div
              className="text-gray-800"
              dangerouslySetInnerHTML={{
                __html: highlight(entry.ShortDesc, searchTerm),
              }}
            />
            <div
              className="text-gray-500 italic text-xs mt-1"
              dangerouslySetInnerHTML={{
                __html: highlight(entry.LongDesc, searchTerm),
              }}
            />
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 italic text-center">No matches found.</p>
        )}
      </div>

      {/* Close button */}
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

// Highlight search term in ShortDesc / LongDesc
function highlight(text: string, term: string) {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, "gi");
  return text.replace(
    regex,
    `<span style="color: orange; font-weight: bold;">$1</span>`
  );
}
