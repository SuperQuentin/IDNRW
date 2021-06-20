import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import getReports from "../../api/getReports";
import ReportItem from "../../components/ReportItem";
import { UserContext } from "../../contexts/userContext";
import { ConsultationParamList } from "../../navigation/ConsultationStackNavigator";
import ReportDetailsModal from "../../components/ReportDetailsModal";

import {
  onSuccessToast,
  onNotPermittedToast,
  onErrorToast,
} from "../../utils/toast";

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
  }

  async componentDidMount() {
    this.props.navigation.addListener(
      "focus",
      async () => await this.updateShift()
    );
    await this.updateShift();
  }

  componentWillUnmount() {
    this.props.navigation.removeListener(
      "focus",
      async () => await this.updateShift()
    );
  }

  async updateShift() {
    try {
      let response = await getReports(this.context.token);

      if (response.status === 200) {
        onSuccessToast();
        this.setState({
          shifts: response.data.shift,
        });
      }
    } catch (e) {
      if (e.status === 401) {
        onNotPermittedToast();
      } else {
        onErrorToast();
      }
    }
  }

  renderItem = ({ item }: { item: any }) =>
    item ? <ReportItem {...item} /> : "";

  render() {
    return (
      <View>
        {this.state.shifts ? (
          <FlatList
            data={this.state.shifts}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text>Rine</Text>
        )}
      </View>
    );
  }
}
