import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import screen views use in the stack navigator
import SplashScreen from '../screens/SplashScreen'
import SignInScreen from '../screens/SignIn'

import ActionTab from './ActionBottomTabNavigator'

export type RootParamList = {
    SignIn: { initials: string },
    Action: undefined
}

export type RootState = {
    isLoading: boolean,
    userToken?: string,
}

const Root = createStackNavigator<RootParamList>()

export default class RootStackNavigator extends Component<{},RootState> {
    constructor({}){
        super({})

        this.state = {
            isLoading: false,
        }
    }
    
    
    render() {
        if (this.state.isLoading) {
            return <SplashScreen />
        }

        return (
            <Root.Navigator>
                { this.state.userToken == null ? (
                    <>
                        <Root.Screen name="SignIn" component={SignInScreen} options={{ title: "Login" }} initialParams={{ initials: '' }} />
                    </>
                ) : (
                    <>
                        <Root.Screen name="Action" component={ActionTab} />
                    </>
                )}


            </Root.Navigator>
        )
    }
}




