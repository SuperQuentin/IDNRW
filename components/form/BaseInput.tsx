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
    const { label, children } = this.props;
    return (
      <View>
        <Text>{label}</Text>
        {children}
      </View>
    );
  }
}
