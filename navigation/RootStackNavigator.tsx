import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/Login'
import ActionTab from './ActionBottomTabNavigator'

export type RootParamList = {
    Login: { initials: string },
    Report: undefined,
    Drug: undefined,
}

const Root = createStackNavigator<RootParamList>()

export default class RootStackNavigator extends Component{
    render() {
        return (
            <Root.Navigator>
                <Root.Screen name="Login" component={LoginScreen} options={{title: "Login"}} initialParams={{initials: ''}}/>
                <Root.Screen name="Action" component={ActionTab} />
            </Root.Navigator>
        )
    }
}




