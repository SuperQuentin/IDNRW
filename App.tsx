import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootStackNavigator'
import ActionTab from './navigation/ActionBottomTabNavigator'



export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <RootNavigation />
            </NavigationContainer>
        )
    }
}
