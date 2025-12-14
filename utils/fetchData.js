export async function fetchData() {
  try {
    const url =
      "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=50";

    const response = await fetch(url);
    const data = await response.json();

    return data.map((item) => ({
      timestamp: item[0],
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
    }));
  } catch (error) {
    console.log("Fetch Error:", error);
    return [];
  }
}
