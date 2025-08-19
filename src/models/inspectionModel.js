// dit is een model voor inspecties met diverse velden (met fallbacks voor ontbrekende waarden)

export const mapInspection = (apiInspection) => ({
  id: apiInspection.id,
  type: apiInspection.type || "Onbekend type",
  address: apiInspection.address || "Onbekend adres",
  location: apiInspection.location || "N.v.t.",
  date: new Date(apiInspection.date),
  urgent: apiInspection.urgent || false,
  description: apiInspection.description || "Geen omschrijving",
  costEstimate: apiInspection.costEstimate || null,
  status: apiInspection.status || "Onbekend",
  systemType: apiInspection.systemType || "N.v.t.",
  notes: apiInspection.notes || "",
  executedBy: apiInspection.executedBy || "Onbekend",
  action: apiInspection.action || "Geen actie vereist",
  photos: apiInspection.photos || [],
});