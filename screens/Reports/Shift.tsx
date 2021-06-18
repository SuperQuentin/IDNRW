import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import getReports from "../../api/getReports";
import ReportItem from "../../components/ReportItem";
import { UserContext } from "../../contexts/userContext";
import { ConsultationParamList } from "../../navigation/ConsultationStackNavigator";

export type ShiftsReportProps = StackScreenProps<
  ConsultationParamList,
  "ReportDetails"
>;

export default class ShiftsReportScreen extends Component<
  ShiftsReportProps,
  { shifts: [] }
> {
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

  showDetails(id: number) {
    // TODO display repport details
    //rid ? this.props.navigation.push("ReportDetails", { reportId: id }) : false;
  }

  renderItem = ({ item }: { item: any }) =>
    item ? <ReportItem {...item} detailsHandler={this.showDetails} /> : "";

  render() {
    return (
      <View>
        {this.state.shifts ? (
          <FlatList
            data={this.state.shifts}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={{
              marginTop: 24,
            }}
          />
        ) : (
          <Text>Rine</Text>
        )}
      </View>
    );
  }
}
