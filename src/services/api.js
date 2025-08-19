// communicatie met de externe API

const API_URL = "https://my-json-server.typicode.com/SieMei/rec-api/inspecties";

export const fetchInspections = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {

    throw new Error('Failed to fetch inspections');
  }

  const data = await response.json();
  return data;
};