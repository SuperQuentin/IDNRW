import React, { Component } from "react";
import { TextInput } from "react-native";
import BaseInput, { BaseInputProps } from "./BaseInput";

export interface InputProps extends BaseInputProps {
  value?: string;
  onChangeText?: Function;
  secureTextEntry?: Boolean;
}

export default class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    const { label } = this.props;
    return (
      <BaseInput label={label}>
        <TextInput {...this.props} />
      </BaseInput>
    );
  }
}
