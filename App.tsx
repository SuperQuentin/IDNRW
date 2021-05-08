import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/RootStackNavigator'

import Login from './screens/Login'

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Root.Navigator>
                    <Root.Screen name="Login" component={Login} options={{title: "Login"}} initialParams={{initials: ''}}/>
                </Root.Navigator>
            </NavigationContainer>

        )
    }
}
