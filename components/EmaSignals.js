import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmaSignals({ signal }) {
  if (!signal) {
    return (
      <Text style={{ color: "white", textAlign: "center", marginTop: 10 }}>
        Waiting for signal…
      </Text>
    );
  }

  let bg = "#333";
  let color = "#FFF";
  let emoji = "➖";

  if (signal.includes("BUY") || signal.includes("UP")) {
    bg = "#003300";
    color = "#00FF66";
    emoji = "📈";
  }

  if (signal.includes("SELL") || signal.includes("DOWN")) {
    bg = "#330000";
    color = "#FF4444";
    emoji = "📉";
  }

  return (
    <View style={[styles.box, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color }]}>{emoji} {signal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
