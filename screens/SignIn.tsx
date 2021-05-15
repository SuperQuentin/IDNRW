import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack"
import { RootParamList } from '../navigation/RootStackNavigator'

type LoginProps = StackScreenProps<RootParamList, 'SignIn'>

export default class Login extends Component<LoginProps> {
    constructor({ navigation, route }: LoginProps) {
        super({ navigation, route })
    }

    onPressConnection = () => {
        this.props.navigation.navigate('Action')
    }

    render() {
        const { initials } = this.props.route.params

        return (
            <View>
                <Text>Hello {initials   }</Text>
                <Button title="Connexion" onPress={this.onPressConnection} />
            </View>
        )
    }
}