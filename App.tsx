import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigation/RootStackNavigator";
import { UserContext } from "./contexts/userContext";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./screens/SplashScreen";

export default class App extends Component {
  state = {
    user: {},
    isLoading: true,
  };

  async componentDidMount() {
    const token = await SecureStore.getItemAsync("token");
    const initials = await AsyncStorage.getItem("initials");
    const currentBaseId = await AsyncStorage.getItem("currentBaseId");

    this.setState({
      user: {
        initials,
        token,
        currentBaseId: Number(currentBaseId),
      },
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;

    if (isLoading) {
      return <SplashScreen />;
    }

    return (
      <UserContext.Provider
        value={{
          ...user,
          setUser: (newUser) => {
            this.setState({ user: newUser });
          },
          clear: () => {
            this.setState({ user: {} });
          },
        }}
      >
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </UserContext.Provider>
    );
  }
}
