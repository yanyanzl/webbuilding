const API_URL = "https://YOUR-RENDER-APP.onrender.com";

export async function fetchChart({ datetime, lat, lon }) {
  const res = await fetch(`${API_URL}/chart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ datetime, lat, lon })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch chart");
  }

  return res.json();
}
