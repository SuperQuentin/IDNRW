import React, { Component } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ActionBottomTabParamList } from "../navigation/ActionBottomTabNavigator";
import { View, Text } from "react-native";

export type DrugProps = StackScreenProps<ActionBottomTabParamList, "Drug">;

export default class Drug extends Component<DrugProps> {
  constructor(props: DrugProps) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Drugs</Text>
      </View>
    );
  }
}
