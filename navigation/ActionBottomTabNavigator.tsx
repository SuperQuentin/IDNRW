import React, { Component, ReactNode } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ConsultationNav from "./ConsultationStackNavigator";
import DrugScreen from "../screens/Drug";

export interface ActionBottomTabProps {
  children?: ReactNode;
}

export type ActionBottomTabParamList = {
  Consultation: undefined;
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
          name="Consultation"
          component={ConsultationNav}
          options={{ title: "Consultations" }}
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
