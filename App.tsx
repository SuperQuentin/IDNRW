import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import RootNavigation from "./navigation/RootStackNavigator";
import { UserContext } from "./contexts/userContext";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./screens/SplashScreen";
import ConfirmationBtn from "./components/button/TimetableConfirmationButton";
import getUnconfirmedWorkplans from "./api/getUnconfirmedWorkplans";
import { RootParamList } from "./navigation/RootStackNavigator";
import {
  onSuccessToast,
  onNotPermittedToast,
  onErrorToast,
} from "./utils/toast";

export type AppProps = StackScreenProps<RootParamList, "TimeTable">;
export default class App extends Component<AppProps> {
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
        countUnconfirmedWorkplans: 0,
      },
      isLoading: false,
    });
  }

  async countUnconfirmedWorkplans(token: string) {
    try {
      let response = await getUnconfirmedWorkplans(token);

      if (response.status === 200) {
        onSuccessToast();
        this.setState({
          countUnconfirmedWorkplans: response.data.length,
        });
      }
    } catch (e) {
      if (e.status === 401) {
        onNotPermittedToast();
      } else {
        onErrorToast();
      }
    }
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
        <ConfirmationBtn
          numberConfirmation={user.countUnconfirmedWorkplans}
          visible={user.token != null} // TODO && user.countUnconfirmedWorkplans > 0
          navigation={() => this.props.navigation.push("TimeTable")}
        />
      </UserContext.Provider>
    );
  }
}
