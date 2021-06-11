import React, { Component } from "react";
import { Button } from "react-native";
import { UserContext } from "../../contexts/userContext";
import * as SecureStore from "expo-secure-store";

export default class LogoutBtn extends Component {
  static contextType = UserContext;

  render() {
    return (
      <UserContext.Consumer>
        {() => (
          <Button onPress={this.context.clear} title="logout" color="#A997DF" />
        )}
      </UserContext.Consumer>
    );
  }
}
