
const API_URL = "https://rec-api.azurewebsites.net";

// helper om responses te checken
async function handleResponse(res, errorMsg) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${errorMsg}: ${res.status} ${text}`);
  }
  return res.json();
}

// alle inspecties ophalen
export async function fetchInspections() {
  const res = await fetch(`${API_URL}/api/inspections`);
  return handleResponse(res, "Fout bij het ophalen van inspecties");
}

//
export async function fetchInspectionById(id) {
  const res = await fetch(`${API_URL}/api/inspections/${encodeURIComponent(id)}`);
  return handleResponse(res, `Fout bij het ophalen van inspectie ${id}`);
}

// kennisbank ophalen
export async function fetchKnowledge() {
  const res = await fetch(`${API_URL}/api/knowledgeBase`);
  return handleResponse(res, "Fout bij het ophalen van kennisbank");
}

// inspectie updaten
export async function patchInspection(id, patch) {
  const res = await fetch(`${API_URL}/api/inspections/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return handleResponse(res, `Fout bij het updaten van inspectie ${id}`);
}