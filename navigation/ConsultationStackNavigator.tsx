import { createStackNavigator } from "@react-navigation/stack";
import React, { Component, ReactNode } from "react";
import ReportDetails from "../screens/Reports/Details";
import ReportsTopTabNav from "./ReportsTopTabNavigator";

export type ConsultationParamList = {
  ReportTopTab: undefined;
  ReportDetails: { reportId: number };
};

const Consultation = createStackNavigator<ConsultationParamList>();
export default class ConsultationStackNavigator extends Component {
  render() {
    return (
      <Consultation.Navigator>
        <Consultation.Screen
          name="ReportTopTab"
          options={{ headerShown: false }}
          component={ReportsTopTabNav}
        />
        <Consultation.Screen name="ReportDetails" component={ReportDetails} />
      </Consultation.Navigator>
    );
  }
}
