import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { View } from "react-native";
import getReports from "../../api/getReports";
import ReportItem from "../../components/ReportItem";
import { UserContext } from "../../contexts/userContext";
import { ConsultationParamList } from "../../navigation/ConsultationStackNavigator";
import {
  onSuccessToast,
  onNotPermittedToast,
  onErrorToast,
} from "../../utils/toast";

export type DrugsReportProps = StackScreenProps<
  ConsultationParamList,
  "ReportDetails"
>;

export default class DrugsReportScreen extends Component<
  DrugsReportProps,
  { drugs: [] }
> {
  static contextType = UserContext;
  constructor(props: DrugsReportProps) {
    super(props);
    this.state = {
      drugs: [],
    };
  }
  async componentDidMount() {
    this.props.navigation.addListener(
      "focus",
      async () => await this.updateDrugs()
    );
    await this.updateDrugs();
  }

  componentWillUnmount() {
    this.props.navigation.removeListener(
      "focus",
      async () => await this.updateDrugs()
    );
  }

  showDetails(id: number) {
    //id ? this.props.navigation.push("ReportDetails", { reportId: id }) : false;
  }
  async updateDrugs() {
    try {
      let response = await getReports(this.context.token);

      if (response.status === 200) {
        onSuccessToast();
        this.setState({
          drugs: response.data.drug,
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
    item ? <ReportItem {...item} navigation={this.props.navigation} /> : "";

  render() {
    return (
      <View>
        {this.state.drugs ? (
          <FlatList
            data={this.state.drugs}
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
