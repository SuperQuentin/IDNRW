import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>test</View>
      <View style={styles.item}>test</View>
      <View style={styles.item}>test</View>
      <View style={styles.item}>test</View>
      <View style={styles.item}>test</View>
      <View style={styles.item}>test</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 128,
    flex: 1,
    padding: 8,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  item: {
    width: 100,
    maxHeight: 32,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
    padding: 4,
    backgroundColor: "red",
  },
});
