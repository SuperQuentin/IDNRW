import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import getReports from "../../api/getReports";
import Report from "../../components/Reports";
import { UserContext } from "../../contexts/userContext";
import { ReportsTopTabParamList } from "../../navigation/ReportsTopTabNavigator";

export type ShiftsReportProps = StackScreenProps<
  ReportsTopTabParamList,
  "Shift"
>;

export default class ShiftsReportScreen extends Component<ShiftsReportProps> {
  static contextType = UserContext;
  constructor(props: ShiftsReportProps) {
    super(props);
    this.state = {
      shifts: [],
    };
    props.navigation.addListener("focus", async () => await this.updateShift());
  }

  async componentDidMount() {
    await this.updateShift();
  }

  async updateShift() {
    let reports = await getReports(this.context.token);
    this.setState({
      shifts: reports.shift,
    });
  }

  render() {
    return <Report data={this.state.shifts} />;
  }
}
