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
        <Text
          style={{
            fontSize: 20,
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
        {children}
      </View>
    );
  }
}
