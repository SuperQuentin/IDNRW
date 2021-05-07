import React, { Component } from "react";
import { View, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack"
import { RootParamList } from '../navigation/RootStackNavigator'

type LoginProps = StackScreenProps<RootParamList, 'Login'>

export default class Login extends Component<LoginProps> {
    constructor({ navigation, route }: LoginProps) {
        super({ navigation, route })
    }

    render() {
        return (
            <View>
                <Text>Login</Text>
            </View>
        )
    }
}