import React, { Component } from 'react'
import { StackScreenProps } from "@react-navigation/stack"
import { RootParamList } from '../navigation/RootStackNavigator'
import { View } from 'react-native'

type ReportProps = StackScreenProps<RootParamList, 'Report'>

export default class Report extends Component<ReportProps>{
    render(){
        return (
            <View>
                Report
            </View>
        )
    }
}