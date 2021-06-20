import { createStackNavigator } from "@react-navigation/stack";
import React, { Component, ReactNode } from "react";
import ReportsDrugsTopTabNav from "./ReportsDrugsTopTabNavigator";

export type ReportsDrugsParamList = {
  ReportsDrugsTopTab: undefined;
};

const Report = createStackNavigator<ReportsDrugsParamList>();
export default class ReportsDrugsTopTabStackNavigator extends Component {
  render() {
    return (
      <Report.Navigator>
        <Report.Screen
          name="ReportsDrugsTopTab"
          options={{ headerShown: false }}
          component={ReportsDrugsTopTabNav}
        />
      </Report.Navigator>
    );
  }
}
