import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { View, Text } from "react-native";
import getReportDetails from "../../api/getReportDetails";
import { UserContext } from "../../contexts/userContext";
import { ConsultationParamList } from "../../navigation/ConsultationStackNavigator";

export type ReportDetailsProps = StackScreenProps<
  ConsultationParamList,
  "ReportDetails"
>;

export default class ReportDetails extends Component<ReportDetailsProps> {
  static contextType = UserContext;
  constructor(props: ReportDetailsProps) {
    super(props);
  }

  async componentDidMount() {
    let data = getReportDetails(this.context.token, this.props.reportId);
    console.log(data);
  }

  render() {
    return (
      <View>
        <Text>Youpi</Text>
      </View>
    );
  }
}
