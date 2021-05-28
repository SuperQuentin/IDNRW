import React, { Component, createContext, ReactNode } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";

// import screen views use in the stack navigator
import SplashScreen from "../screens/SplashScreen";
import SignInScreen from "../screens/SignIn";

import ActionTab from "./ActionBottomTabNavigator";
import getToken from "../api/getToken";

export interface RootStackProps {
  children?: ReactNode;
}

export type RootParamList = {
  SignIn: { signIn: Function };
  Action: undefined;
};

export interface RootState {
  isLoading: boolean;
  isSignOut: boolean;
  userToken?: string;
}

const Root = createStackNavigator<RootParamList>();

export default class RootStackNavigator extends Component<
  RootStackProps,
  RootState
> {
  constructor(props: RootStackProps) {
    super(props);

    this.state = {
      isLoading: false,
      isSignOut: false,
      userToken: undefined,
    };
  }

  signIn = async (initials: string, password: string) => {
    this.setState({ isLoading: true });
    let token;
    try {
      token = await this.getLocalStoreValue("usertoken");

      if (token == null) {
        token = await getToken(initials, password);
        this.store("usertoken", token);
      }
    } catch (e) {
      console.log("oups something goes wrong...");
    }

    this.setState({
      isLoading: false,
      isSignOut: false,
      userToken: token,
    });
  };
  signOut = () => {
    this.setState({ isSignOut: true, userToken: undefined });
  };

  store = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  };

  getLocalStoreValue = async (key: string) => {
    return await SecureStore.getItemAsync(key);
  };

  isEmpty(str?: string) {
    return !str || str.length === 0;
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      <Root.Navigator>
        {this.isEmpty(this.state.userToken) ? (
          <>
            <Root.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: "Login",
                animationTypeForReplace: this.state.isSignOut ? "pop" : "push",
              }}
              initialParams={{ signIn: this.signIn }}
            >
              {(props) => <SignInScreen {...props} signIn={this.signIn} />}
            </Root.Screen>
          </>
        ) : (
          <>
            <Root.Screen name="Action" component={ActionTab} />
          </>
        )}
      </Root.Navigator>
    );
  }
}
