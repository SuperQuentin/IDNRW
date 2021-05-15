import React, { Component, ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReportScreen from '../screens/Report'
import DrugScreen from '../screens/Drug'

type ActionBottomTabProps = {
    children?: ReactNode
}

export type ActionBottomTabParamList = {
    Report: undefined,
    Drug: undefined
}

const Tab = createBottomTabNavigator<ActionBottomTabParamList>()

export default class ActionBottomTabNavigator extends Component<ActionBottomTabProps> {
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Report" component={ReportScreen} options={{title: "Report", }}/>
                <Tab.Screen name="Drug" component={DrugScreen} options={{title: "Drug"}}/>
            </Tab.Navigator>
        )
    }
}