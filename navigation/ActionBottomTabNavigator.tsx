import React, { Component, ReactNode } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReportNav from "./ReportsTopTabNavigator";
import DrugScreen from "../screens/Drug";

export interface ActionBottomTabProps {
  children?: ReactNode;
}

export type ActionBottomTabParamList = {
  Report: undefined;
  Drug: undefined;
};

const Tab = createBottomTabNavigator<ActionBottomTabParamList>();

export default class ActionBottomTabNavigator extends Component<ActionBottomTabProps> {
  constructor(props: ActionBottomTabProps) {
    super(props);
  }
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Report"
          component={ReportNav}
          options={{ title: "Reports" }}
        />
        <Tab.Screen
          name="Drug"
          component={DrugScreen}
          options={{ title: "Drug" }}
        />
      </Tab.Navigator>
    );
  }
}
