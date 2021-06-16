import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import getReports from "../../api/getReports";
import Report from "../../components/Reports";
import { UserContext } from "../../contexts/userContext";
import { ReportsTopTabParamList } from "../../navigation/ReportsTopTabNavigator";

export type DrugsReportProps = StackScreenProps<ReportsTopTabParamList, "Drug">;

export default class DrugsReportScreen extends Component<DrugsReportProps> {
  static contextType = UserContext;
  constructor(props: DrugsReportProps) {
    super(props);
    this.state = {
      drugs: [],
    };

    props.navigation.addListener("focus", async () => await this.updateDrugs());
  }
  async componentDidMount() {
    await this.updateDrugs();
  }

  async updateDrugs() {
    let reports = await getReports(this.context.token);
    this.setState({
      drugs: reports.drug,
    });
  }

  render() {
    return <Report data={this.state.drugs} />;
  }
}
