import React, { Component, ReactNode } from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ConsultationNav from "./ConsultationStackNavigator";
import ReportNav from "./ReportDrugsStackNavigator";

export interface ActionBottomTabProps {
  children?: ReactNode;
}

export type ActionBottomTabParamList = {
  Consultation: undefined;
  Report: undefined;
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
          name="Consultation"
          component={ConsultationNav}
          options={{ title: "Consultations" }}
        />
        <Tab.Screen
          name="Report"
          component={ReportNav}
          options={{ title: "Rapporter" }}
        />
      </Tab.Navigator>
    );
  }
}
