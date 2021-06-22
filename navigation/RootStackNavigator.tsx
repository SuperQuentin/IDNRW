import React, { Component, createContext, ReactNode, useReducer } from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { UserContext } from "../contexts/userContext";

// import screen views use in the stack navigator
import SplashScreen from "../screens/SplashScreen";
import SignInScreen from "../screens/SignIn";
import TimeTableScreen from "../screens/Timetable";

import ActionTab from "./ActionBottomTabNavigator";
import LogoutBtn from "../components/button/Logout";

export interface RootStackProps {
  children?: ReactNode;
}

export type RootParamList = {
  SignIn: { signIn: Function };
  Action: undefined;
  TimeTable: undefined;
};

export interface RootState {
  isLoading: boolean;
  isSignOut: boolean;
  userToken?: string | null;
}

const Root = createStackNavigator<RootParamList>();

export default class RootStackNavigator extends Component<
  RootStackProps,
  RootState
> {
  static contextType = UserContext;

  constructor(props: RootStackProps) {
    super(props);

    this.state = {
      isLoading: false,
      isSignOut: false,
    };
  }

  isEmpty(str?: string | null) {
    return !str || str.length === 0;
  }

  render() {
    const { token } = this.context;

    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      <Root.Navigator initialRouteName="TimeTable">
        {/* TODO Remove initialRouteName or Set it to action */}

        {!token ? (
          <>
            <Root.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: "Login",
                animationTypeForReplace: this.state.isSignOut ? "pop" : "push",
                headerRight: () => {
                  return (
                    <Text style={{ color: "gray", marginRight: 20 }}>
                      version eval QAN
                    </Text>
                  );
                },
              }}
            ></Root.Screen>
          </>
        ) : (
          <>
            <Root.Screen
              name="Action"
              options={{
                headerRight: () => <LogoutBtn />,
                title: "CSU",
              }}
              component={ActionTab}
            />
            <Root.Screen
              name="TimeTable"
              options={{
                headerRight: () => <LogoutBtn />,
                title: "",
              }}
              component={TimeTableScreen}
            />
          </>
        )}
      </Root.Navigator>
    );
  }
}
