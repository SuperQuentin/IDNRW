import React, { Component } from "react";
import { View, Text } from "react-native";

export interface BaseInputProps {
  children?: React.ReactNode;
  label: string;
}

export default class BaseInput extends Component<BaseInputProps> {
  constructor(props: BaseInputProps) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>{this.props.label}</Text>
        {this.props.children}
      </View>
    );
  }
}
