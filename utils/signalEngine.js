import { calculateEMA9, calculateEMA21 } from "./emaCalculator.js";

export default function signalEngine(candles) {
  if (!candles || candles.length < 21) return "Not enough data";

  const closePrices = candles.map(c => c.close);

  const ema9 = calculateEMA9(closePrices);
  const ema21 = calculateEMA21(closePrices);

  const last9 = ema9[ema9.length - 1];
  const last21 = ema21[ema21.length - 1];

  const prev9 = ema9[ema9.length - 2];
  const prev21 = ema21[ema21.length - 2];

  // Trend Logic
  let trend = "";
  if (last9 > last21) trend = "UPTREND";
  else if (last9 < last21) trend = "DOWNTREND";
  else trend = "SIDEWAYS";

  // Signal Logic (Crossovers)
  if (prev9 < prev21 && last9 > last21) {
    return "BUY SIGNAL 📈";
  }

  if (prev9 > prev21 && last9 < last21) {
    return "SELL SIGNAL 📉";
  }

  return trend;
}
