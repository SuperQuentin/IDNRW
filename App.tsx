import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootStackNavigator'



export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <RootNavigation />
            </NavigationContainer>
        )
    }
}
