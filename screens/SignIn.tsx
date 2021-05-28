import React, { Component } from "react";
import { View, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootParamList } from "../navigation/RootStackNavigator";
import SquareButtonContainer from "../components/button/SquareButtonContainer";
import SquareButton from "../components/button/SquareButton";
import getBases from "../api/getBases";

import Input from "../components/form/Input";

interface SignInScreen {
  bases: base[];
  user: {
    initials: string;
    password: string;
    currentBaseID: number;
  };
}

export type SignInProps = StackScreenProps<RootParamList, "SignIn">;
export default class SignIn extends Component<SignInProps> {
  state = {
    bases: [],
    user: {
      intitials: "",
      password: "",
      currentBaseId: 0,
    },
  };

  constructor(props: SignInProps) {
    super(props);
    this.setInitials = this.setInitials.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setCurrentBase = this.setCurrentBase.bind(this);
  }

  componentDidMount = async () => {
    this.setState({
      bases: await getBases(),
      user: {
        ...this.state.user,
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

  render() {
    const { user, bases } = this.state;

    return (
      <View>
        <Input label="Initials" onChangeText={this.setInitials} />
        <Input label="Mot de passe" onChangeText={this.setPassword} />
        <SquareButtonContainer callback={this.setCurrentBase}>
          {bases &&
            bases.map((base: any) => {
              return (
                <SquareButton key={base.id} label={base.name} value={base.id} />
              );
            })}
        </SquareButtonContainer>
        <Button
          title="Connexion"
          onPress={() => this.props.signIn(user.intitials, user.password)}
        />
      </View>
    );
  }
}
