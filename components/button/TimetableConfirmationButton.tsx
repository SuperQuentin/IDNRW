import React, { Component } from "react";
import { View, Text, Button } from "react-native";

interface TimetableConfirmationButtonProps {
  visible: boolean;
  navigation?: object;
  numberConfirmation: number;
}

export default class TimetableConfirmationButton extends Component<TimetableConfirmationButtonProps> {
  constructor(props: TimetableConfirmationButtonProps) {
    super(props);
  }
  render() {
    return this.props.visible ? (
      <View
        style={{ position: "absolute", bottom: 48, right: 24, elevation: 16 }}
      >
        <Text
          style={{
            backgroundColor: "red",
            borderRadius: 32,
            width: 32,
            position: "relative",
            color: "#ffffff",
          }}
        >
          {this.props.numberConfirmation}
        </Text>
        <Button
          title="Horaires à confirmer"
          onPress={() => this.props.navigation}
        />
      </View>
    ) : (
      <View />
    );
  }
}
