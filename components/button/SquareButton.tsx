import React, { Component } from "react";
import { TouchableOpacity, ImageBackground, Text } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";

export interface SquareButtonProps {
  label: string;
  value: string;
  callback?: Function;
  img?: string;
}

export default class SquareButtonContainer extends Component<SquareButtonProps> {
  constructor(props: SquareButtonProps) {
    super(props);
  }

  onPressBtn = () => {
    if (this.props.callback) {
      this.props.callback({ city: this.props.value });
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPressBtn()}>
        <ImageBackground
          source={{ uri: this.props.img }}
          style={{
            width: 104,
            height: 104,
            backgroundColor: "#EE6C4D",
          }}
        >
          <Text>{this.props.label}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
