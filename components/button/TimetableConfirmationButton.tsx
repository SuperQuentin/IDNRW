import React, { Component } from "react";
import { View, Button } from "react-native";

interface TimetableConfirmationButtonProps {
  visible: boolean;
  navigation?: object;
  numberConfirmation: number;
}

export default class TimetableConfirmationButton extends Component<TimetableConfirmationButtonProps> {
  constructor(props: TimetableConfirmationButtonProps) {
    super(props);
    this.state = {
      visible: this.props.visible || false,
    };
  }
  render() {
    return this.state.visible ? (
      <View style={{ position: "absolute", bottom: 48, right: 24 }}>
        <Button
          title="Horaires à confirmer"
          onPress={() => console.log("work")}
        />
      </View>
    ) : (
      <View />
    );
  }
}
