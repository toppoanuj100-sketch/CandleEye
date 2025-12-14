import React from "react";
import { View, Text, StyleSheet } from "react-native";
import signalEngine from "../utils/signalEngine";

export default function TrendMeter({ candles }) {
  if (!candles || candles.length === 0) {
    return (
      <Text style={{ color: "white", textAlign: "center", marginTop: 10 }}>
        No trend data available…
      </Text>
    );
  }

  const trend = signalEngine(candles);

  let color = "#FFD700"; // default = yellow
  let emoji = "➡️";       // sideways

  if (trend.includes("UP")) {
    color = "#00FF55";
    emoji = "📈";
  } else if (trend.includes("DOWN") || trend.includes("SELL")) {
    color = "#FF4444";
    emoji = "📉";
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color }]}>{emoji} {trend}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#111",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
