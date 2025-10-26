const API_BASE = "http://127.0.0.1:8000"; // ✅ FastAPI server

export default API_BASE;


 {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    if (!res.ok) {
      console.error("Backend error:", await res.text());
      throw new Error("Failed to save");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getTransactions = async () => {
  const res = await fetch(`${API_BASE_URL}/transactions/`);
  return await res.json();
};
