import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Text style={styles.button}>Bouton</Text>
          <Text style={styles.button}>Bouton</Text>
          <Text style={styles.button}>Bouton</Text>
        </View>

        <View style={styles.main}></View>

        <View style={styles.nav}>
          <Text style={[styles.button, styles.fatButton]}>Bouton</Text>
          <Text style={styles.button}>Bouton</Text>
          <Text style={styles.button}>Bouton</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  main: {
    flex: 1,
  },
  nav: {
    flex: 1,
    maxHeight: 64,
    flexWrap: "nowrap",
    flexShrink: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "coral",
  },
  fatButton: {
    flex: 2,
  },
});
