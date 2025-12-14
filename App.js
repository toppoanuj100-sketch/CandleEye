import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";

// Components
import Chart from "./components/Chart";
import TrendMeter from "./components/TrendMeter";
import SupportResistance from "./components/SupportResistance";
import EmaSignals from "./components/EmaSignals";

// Utils
import { fetchData } from "./utils/fetchData.js";
import signalEngine from "./utils/signalEngine";

export default function App() {
  const [candles, setCandles] = useState([]);
  const [signal, setSignal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarketData();

    const interval = setInterval(() => {
      loadMarketData();
    }, 5000); // हर 5 सेकंड में अपडेट

    return () => clearInterval(interval);
  }, []);

  async function loadMarketData() {
    setLoading(true);
    const data = await fetchData();
    setCandles(data);
    setSignal(signalEngine(data));
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#00FFAA" />
        <Text style={{ color: "white", marginTop: 10 }}>Loading market data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🔥 CandleEye — Smart Market Analysis</Text>

      {/* Chart */}
      <Chart data={candles} />

      {/* Trend Meter */}
      <TrendMeter candles={candles} />

      {/* Support / Resistance */}
      <SupportResistance candles={candles} />

      {/* EMA Signals */}
      <EmaSignals signal={signal} />

      <Text style={styles.footer}>Market updates every 5 sec…</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 10,
    flex: 1,
  },
  header: {
    textAlign: "center",
    color: "#00FFAA",
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 15,
  },
  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  footer: {
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
  },
});
