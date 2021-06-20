import React, { Component } from "react";
import { View, Button, Picker } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootParamList } from "../navigation/RootStackNavigator";
import SquareButtonContainer from "../components/button/SquareButtonContainer";
import SquareButton from "../components/button/SquareButton";
import getBases from "../api/getBases";
import getToken from "../api/getToken";

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
    this.setState({
      user: {
        ...this.state.user,
        currentBaseId: currentBaseId,
      },
    });
  }

  handleSignIn = async () => {
    const { initials, password, currentBaseId } = this.state.user;
    const token = await getToken(initials, password);

    await SecureStore.setItemAsync("userToken", token);

    await AsyncStorage.setItem("initials", initials.toString());
    await AsyncStorage.setItem("currentBaseId", currentBaseId.toString());

    this.context.setUser({
      ...this.state.user,
      token,
    });
  };

  render() {
    const { user, bases } = this.state;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            marginVertical: 16,
            flex: 1,
            flexDirection: "row",
          }}
        >
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
