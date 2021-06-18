import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { View } from "react-native";
import getReports from "../../api/getReports";
import ReportItem from "../../components/ReportItem";
import { UserContext } from "../../contexts/userContext";
import { ConsultationParamList } from "../../navigation/ConsultationStackNavigator";

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

    props.navigation.addListener("focus", async () => await this.updateDrugs());
  }
  async componentDidMount() {
    await this.updateDrugs();
  }

  showDetails(id: number) {
    id ? this.props.navigation.push("ReportDetails", { reportId: id }) : false;
  }
  async updateDrugs() {
    let reports = await getReports(this.context.token);
    this.setState({
      drugs: reports.drug,
    });
  }

  rrenderItem = ({ item }: { item: any }) =>
    item ? (
      <ReportItem {...item} detailsHandler={(id) => this.showDetails(id)} />
    ) : (
      ""
    );

  render() {
    return (
      <View>
        {this.state.drugs ? (
          <FlatList
            data={this.state.drugs}
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
