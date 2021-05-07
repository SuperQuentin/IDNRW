import { StatusBar } from "expo-status-bar";
import React, { Component, Fragment as Fr } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { t } from "react-native-tailwindcss";
import tailwind from "tailwind-rn";

import Hello from "./components/Hello";

type State = {
  count: number;
  name: string;
};

export default class App extends Component<{}, State> {
  state = {
    count: 0,
    name: "John Doe",
  };

  onChange = (text: string) => {
    this.setState({ name: text });
  };

  onPress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <View
        style={tailwind("max-w-2xl flex m-auto align-center justify-center")}
      >
        <View style={tailwind("w-100 bg-blue-800 p-10 rounded-md ")}>
          <Text style={tailwind("w-100 text-white text-2xl")}>
            <Hello name={this.state.name} /> {this.state.count} fois.
          </Text>
          <Button onPress={this.onPress} title="Click on me" color="green" />
        </View>

        <TextInput
          defaultValue={this.state.name}
          onChangeText={(text) => this.onChange(text)}
          style={[t.mT2, t.w106, t.bgGray300, t.rounded]}
        ></TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
