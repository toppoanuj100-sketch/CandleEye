import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SupportResistance({ candles }) {
  if (!candles || candles.length === 0) {
    return (
      <Text style={{ color: "white", textAlign: "center", marginTop: 10 }}>
        No support/resistance data…
      </Text>
    );
  }

  // Close prices only
  const closes = candles.map(c => c.close);

  // Auto calculate support & resistance
  const support = Math.min(...closes.slice(-20));     // lowest price
  const resistance = Math.max(...closes.slice(-20));  // highest price

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Support & Resistance</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Support:</Text>
        <Text style={styles.supportValue}>{support.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Resistance:</Text>
        <Text style={styles.resistanceValue}>{resistance.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    color: "#00E5FF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    color: "#aaa",
    fontSize: 16,
  },
  supportValue: {
    color: "#00FF66",
    fontSize: 16,
    fontWeight: "bold",
  },
  resistanceValue: {
    color: "#FF4444",
    fontSize: 16,
    fontWeight: "bold",
  },
});
