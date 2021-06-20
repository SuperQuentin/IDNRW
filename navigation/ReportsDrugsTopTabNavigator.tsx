import React, { Component, ReactNode } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { UserContext } from "../contexts/userContext";

import PharmaScreen from "../screens/ReportsDrugs/PharmaCheck";
import NovaScreen from "../screens/ReportsDrugs/NovaCheck";
export interface ReportsTopTabProps {
  children?: ReactNode;
}

export type ReportsDrugsTopTabParamList = {
  Pharma: { data: [] | null };
  Nova: { data: [] | null };
};

const Tab = createMaterialTopTabNavigator<ReportsDrugsTopTabParamList>();

export default class ReportsDrugsTopTabNavigator extends Component<ReportsTopTabProps> {
  static contextType = UserContext;
  constructor(props: ReportsTopTabProps) {
    super(props);
  }

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Pharma" component={PharmaScreen} />
        <Tab.Screen name="Nova" component={NovaScreen} />
      </Tab.Navigator>
    );
  }
}
