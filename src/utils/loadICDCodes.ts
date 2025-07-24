// utils/loadICDCodes.ts

export interface ICDEntry {
  Code: string;
  ShortDesc: string;
  LongDesc: string;
}

export async function loadICDCodes(): Promise<ICDEntry[]> {
  const res = await fetch("/data/icd.json");
  if (!res.ok) {
    console.error("Failed to load ICD data");
    return [];
  }

  const data = await res.json();
  return data as ICDEntry[];
}
