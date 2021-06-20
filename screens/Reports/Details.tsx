import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { View, Text } from "react-native";
import getReportDetails from "../../api/getReportDetails";
import { UserContext } from "../../contexts/userContext";
import { ConsultationParamList } from "../../navigation/ConsultationStackNavigator";
import {
  onSuccessToast,
  onNotPermittedToast,
  onErrorToast,
} from "../../utils/toast";

export type ReportDetailsProps = StackScreenProps<
  ConsultationParamList,
  "ReportDetails"
>;

export default class ReportDetails extends Component<ReportDetailsProps> {
  static contextType = UserContext;
  constructor(props: ReportDetailsProps) {
    super(props);
    this.state = {
      details: [],
    };
  }

  async componentDidMount() {
    try {
      let response = await getReportDetails(
        this.context.token,
        this.props.route.params.reportId
      );
      if (response.status === 200) {
        onSuccessToast();
        this.setState({ details: response.data.data });
      }
    } catch (e) {
      if (e.status === 401) {
        onNotPermittedToast();
      } else {
        onErrorToast();
      }
    }
  }

  render() {
    return (
      <View>
        {this.state.details ? (
          this.state.details.map((detail) => {
            return (
              <View
                style={{
                  padding: 16,
                  marginVertical: 4,
                  marginHorizontal: 8,
                  borderRadius: 4,
                  backgroundColor: "#cacaca",
                }}
              >
                <Text>{detail.day == 1 ? "Jour" : "Nuit"}</Text>
                <Text>{detail.action}</Text>
                <Text>{detail.at}</Text>
              </View>
            );
          })
        ) : (
          <Text>Rine</Text>
        )}
      </View>
    );
  }
}
