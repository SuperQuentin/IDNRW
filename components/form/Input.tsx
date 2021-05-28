import React, { Component } from "react";
import { TextInput } from "react-native";
import BaseInput, { BaseInputProps } from "./BaseInput";

export interface InputProps extends BaseInputProps {
  value?: string;
  onChange?: undefined;
}

export default class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return (
      <BaseInput label={this.props.label}>
        <TextInput
          value={this.props.value}
          onChangeText={this.props.onChange}
        />
      </BaseInput>
    );
  }
}
