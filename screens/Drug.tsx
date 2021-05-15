import React, { Component } from 'react'
import ActionTab from '../navigation/ActionBottomTabNavigator'
import { StackScreenProps } from "@react-navigation/stack"
import { RootParamList } from '../navigation/RootStackNavigator'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

type DrugProps = StackScreenProps<RootParamList, 'Drug'>

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