export function calculateEMA(prices, period) {
  if (!prices || prices.length === 0) return [];

  const k = 2 / (period + 1); // smoothing factor
  let emaArray = [prices[0]];

  for (let i = 1; i < prices.length; i++) {
    const ema = prices[i] * k + emaArray[i - 1] * (1 - k);
    emaArray.push(ema);
  }

  return emaArray;
}

export function calculateEMA9(prices) {
  return calculateEMA(prices, 9);
}

export function calculateEMA21(prices) {
  return calculateEMA(prices, 21);
}
