import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/SignIn'
import ActionTab from './ActionBottomTabNavigator'

export type RootParamList = {
    SignIn: { initials: string },
    Action: undefined
}

const Root = createStackNavigator<RootParamList>()

export default class RootStackNavigator extends Component{
    render() {
        return (
            <Root.Navigator>
                <Root.Screen name="SignIn" component={SignInScreen} options={{title: "Login"}} initialParams={{initials: ''}}/>                
                <Root.Screen name="Action" component={ActionTab} />
            </Root.Navigator>
        )
    }
}




