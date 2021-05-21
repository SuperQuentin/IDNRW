import React, { Component } from "react";
import axios from "axios";
import { View, Text, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootParamList } from "../navigation/RootStackNavigator";
import SquareButtonContainer from "../components/button/SquareButtonContainer";
import SquareButton from "../components/button/SquareButton";

import Input from "../components/form/Input";

export type SignInProps = StackScreenProps<RootParamList, "SignIn">;

export default class SignIn extends Component<SignInProps> {
  constructor(props: SignInProps) {
    super(props);
    this.state = {
      cities: [],
    };
    this.getCities();
  }

  onPressConnection = () => {
    this.props.navigation.navigate("Action");
  };

  getCities = async () => {
    let response = await axios.get("http://127.0.0.1:8000/api/bases");
    this.setState({ cities: response.data });
    console.log(this.state.cities);
  };
  render() {
    const { initials } = this.props.route.params;

    return (
      <View>
        <Input label="Initials" />
        <SquareButtonContainer>
          {this.state.cities &&
            this.state.cities.map((city: any) => {
              return (
                <SquareButton key={city.id} label={city.name} value={city.id} />
              );
            })}
        </SquareButtonContainer>
        <Button title="Connexion" onPress={this.onPressConnection} />
      </View>
    );
  }
}
