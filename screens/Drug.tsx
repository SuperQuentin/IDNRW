import React, { Component } from 'react'
import ActionTab from '../navigation/ActionBottomTabNavigator'
import { StackScreenProps } from "@react-navigation/stack"
import {  ActionBottomTabParamList } from '../navigation/ActionBottomTabNavigator'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

type DrugProps = StackScreenProps< ActionBottomTabParamList, 'Drug'>

export default class Drug extends Component<DrugProps> {
    constructor({ navigation, route }: DrugProps ){
        super({navigation, route})
    }

    render(){
        return (
            <View>
                Drugs
            </View>
        )
    }
}