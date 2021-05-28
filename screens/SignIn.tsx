import React, { Component } from "react";
import axios from "axios";
import { View, Text, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootParamList } from "../navigation/RootStackNavigator";
import SquareButtonContainer from "../components/button/SquareButtonContainer";
import SquareButton from "../components/button/SquareButton";
import getBases from "../api/getBases";

import Input from "../components/form/Input";

export type SignInProps = StackScreenProps<RootParamList, "SignIn">;

export default class SignIn extends Component<SignInProps, { bases: [] }> {
  constructor(props: SignInProps) {
    super(props);
    this.state = {
      bases: [],
    };
  }

  componentDidMount = async () => {
    this.setState({ bases: await getBases() });
  };

  onPressConnection = () => {};

  render() {
    const { initials } = this.props.route.params;

    return (
      <View>
        <Input label="Initials" />
        <SquareButtonContainer>
          {this.state.bases &&
            this.state.bases.map((base: any) => {
              return (
                <SquareButton key={base.id} label={base.name} value={base.id} />
              );
            })}
        </SquareButtonContainer>
        <Button title="Connexion" onPress={this.onPressConnection} />
      </View>
    );
  }
}
