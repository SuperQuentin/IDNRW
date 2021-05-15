import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack"
import { RootParamList } from '../navigation/RootStackNavigator'

import Input from '../components/form/Input'


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
                <Input label="Initials" />
                <Button title="Connexion" onPress={this.onPressConnection} />
            </View>
        )
    }
}