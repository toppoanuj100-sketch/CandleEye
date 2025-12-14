import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CandlestickChart } from "react-native-wagmi-charts";

export default function Chart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
        No chart data available…
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📊 Market Chart</Text>

      <CandlestickChart.Provider data={data}>
        <CandlestickChart height={300}>
          <CandlestickChart.Candles />
          <CandlestickChart.Crosshair />
        </CandlestickChart>
      </CandlestickChart.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  heading: {
    color: "#00FFAA",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
