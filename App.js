import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";

export default function App() {
  const [data, setData] = useState([]);
  const [ema9, setEma9] = useState([]);
  const [ema21, setEma21] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sample candle data (Later we replace with Live Market API)
  useEffect(() => {
    fetch("https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100")
      .then((res) => res.json())
      .then((raw) => {
        const formatted = raw.map((c) => ({
          timestamp: c[0],
          open: parseFloat(c[1]),
          high: parseFloat(c[2]),
          low: parseFloat(c[3]),
          close: parseFloat(c[4]),
        }));

        setData(formatted);

        setEma9(calculateEMA(formatted.map((i) => i.close), 9));
        setEma21(calculateEMA(formatted.map((i) => i.close), 21));

        setLoading(false);
      });
  }, []);

  const calculateEMA = (price, period) => {
    let emaArray = [];
    let k = 2 / (period + 1);
    let ema = price[0];

    for (let i = 0; i < price.length; i++) {
      ema = price[i] * k + ema * (1 - k);
      emaArray.push(ema);
    }
    return emaArray;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ color: "white" }}>Loading market data…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>CandleEye</Text>

      <CandlestickChart.Provider data={data}>
        <CandlestickChart height={350}>
          <CandlestickChart.Candles />
        </CandlestickChart>
      </CandlestickChart.Provider>

      <Text style={styles.section}>EMA Indicators</Text>

      <LineChart.Provider data={ema9.map((e, i) => ({ timestamp: data[i].timestamp, value: e }))}>
        <LineChart height={100}>
          <LineChart.Path color="#00E676" />
        </LineChart>
      </LineChart.Provider>

      <LineChart.Provider data={ema21.map((e, i) => ({ timestamp: data[i].timestamp, value: e }))}>
        <LineChart height={100}>
          <LineChart.Path color="#FF1744" />
        </LineChart>
      </LineChart.Provider>

      <Text style={styles.footer}>Market Trend:  
        {ema9[ema9.length - 1] > ema21[ema21.length - 1] ? "Uptrend 📈" : "Downtrend 📉"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  header: { color: "#00E5FF", fontSize: 30, fontWeight: "bold", textAlign: "center", marginVertical: 20 },
  section: { color: "#FFF", fontSize: 20, marginTop: 20 },
  footer: { color: "#00E5FF", fontSize: 22, fontWeight: "bold", marginTop: 20, textAlign: "center" },
});
