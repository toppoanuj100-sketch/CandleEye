import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { CandlestickChart } from "react-native-wagmi-charts";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=50"
    )
      .then((response) => response.json())
      .then((json) => {
        const formatted = json.map((item) => ({
          timestamp: item[0],
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
        }));
        setData(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#00FF99" />
        <Text style={{ color: "white", marginTop: 10 }}>Loading chart...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CandleEye</Text>

      <View style={{ height: 350, marginTop: 20 }}>
        <CandlestickChart.Provider data={data}>
          <CandlestickChart height={350}>
            <CandlestickChart.Candles />
            <CandlestickChart.Crosshair />
          </CandlestickChart>
        </CandlestickChart.Provider>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#00FF99",
  },
});
