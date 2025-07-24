// utils/loadCPTCodes.ts

export interface CPTCode {
  CPT_CODE: string;
  "SHORT_ DESCRIPTION": string;
}

export async function loadCPTCodes(): Promise<CPTCode[]> {
  try {
    const response = await fetch("/data/cpt.json");
    if (!response.ok) {
      throw new Error("Failed to fetch CPT codes");
    }
    const data: CPTCode[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading CPT codes:", error);
    return [];
  }
}
