import React, { Component } from "react";
import { View, Button, Picker } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootParamList } from "../navigation/RootStackNavigator";
import SquareButtonContainer from "../components/button/SquareButtonContainer";
import SquareButton from "../components/button/SquareButton";
import getBases from "../api/getBases";
import getToken from "../api/getToken";

import {
  onSuccessToast,
  onNotPermittedToast,
  onErrorToast,
} from "../utils/toast";

import { UserContext } from "../contexts/userContext";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../components/form/Input";

interface SignInScreen {
  bases: base[];
  user: {
    initials: string;
    password: string;
    currentBaseId: number;
    currentBaseName: string;
  };
}

export type SignInProps = StackScreenProps<RootParamList, "SignIn">;
export default class SignIn extends Component<SignInProps, {}> {
  static contextType = UserContext;
  state = {
    bases: [],
    user: {
      initials: "",
      password: "",
      currentBaseId: null,
      currentBaseName: null,
    },
  };

  constructor(props: SignInProps) {
    super(props);
    this.setInitials = this.setInitials.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setCurrentBase = this.setCurrentBase.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount = async () => {
    this.setState({
      bases: await getBases(),
      user: {
        ...this.state.user,
        initials: this.context.initials,
      },
    });
  };

  setInitials(initials: string) {
    this.setState({
      user: {
        ...this.state.user,
        initials: initials,
      },
    });
  }
  setPassword(password: string) {
    this.setState({
      user: {
        ...this.state.user,
        password: password,
      },
    });
  }
  setCurrentBase(currentBaseId: number) {
    let baseName = this.state.bases.find((o) => o.id === currentBaseId);

    this.setState({
      user: {
        ...this.state.user,
        currentBaseId: currentBaseId,
        currentBaseName: baseName ? baseName.name : "",
      },
    });
  }

  handleSignIn = async () => {
    try {
      const { initials, password, currentBaseId } = this.state.user;
      const response = await getToken(initials, password);

      if (response.status === 200) {
        onSuccessToast();
      }

      let token = response.data.token;

      await SecureStore.setItemAsync("userToken", token);

      await AsyncStorage.setItem("initials", initials.toString());
      await AsyncStorage.setItem("currentBaseId", currentBaseId.toString());

      this.context.setUser({
        ...this.state.user,
        token,
      });
    } catch (e) {
      if (e.status === 401) {
        console.log("401");
        onNotPermittedToast();
      } else {
        onErrorToast();
      }
    }
  };

  render() {
    const { user, bases } = this.state;

    return (
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <Input label="Initials" onChangeText={this.setInitials} />
          <Input
            label="Mot de passe"
            onChangeText={this.setPassword}
            secureTextEntry={true}
          />
        </View>

        <SquareButtonContainer callback={this.setCurrentBase}>
          {bases &&
            bases.map((base: any) => {
              return (
                <SquareButton key={base.id} label={base.name} value={base.id} />
              );
            })}
        </SquareButtonContainer>
        <View style={{ marginTop: 16 }}>
          <Button
            disabled={this.state.user.currentBaseId === null}
            title="Connexion"
            onPress={this.handleSignIn}
          />
        </View>
      </View>
    );
  }
}
