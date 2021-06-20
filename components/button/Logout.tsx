import React, { Component } from "react";
import { Button, View } from "react-native";
import { UserContext } from "../../contexts/userContext";
import * as SecureStore from "expo-secure-store";

export default class LogoutBtn extends Component {
  static contextType = UserContext;

  render() {
    return (
      <UserContext.Consumer>
        {() => (
          <View style={{ marginRight: 8 }}>
            <Button
              onPress={this.context.clear}
              title={"Déconnexion de " + this.context.currentBaseName}
              color="#7FC6A4"
            />
          </View>
        )}
      </UserContext.Consumer>
    );
  }
}
