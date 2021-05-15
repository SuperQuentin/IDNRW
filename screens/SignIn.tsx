import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack"
import { RootParamList } from '../navigation/RootStackNavigator'

type SignInProps = StackScreenProps<RootParamList, 'SignIn'>

export default class SignIn extends Component<SignInProps> {
    constructor({ navigation, route }: SignInProps) {
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