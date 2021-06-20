import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import getChecks from "../../api/getChecks";
import CheckCard from "../../components/CheckCard";
import { UserContext } from "../../contexts/userContext";
import { ReportsDrugsParamList } from "../../navigation/ReportDrugsStackNavigator";
import postPharmaChecks from "../../api/postPharmaChecks";

import {
  onSuccessToast,
  onNotPermittedToast,
  onErrorToast,
} from "../../utils/toast";

export type PharmaCheckProps = StackScreenProps<
  ReportsDrugsParamList,
  "ReportsDrugsTopTab"
>;

export default class PharmaCheck extends Component<
  PharmaCheckProps,
  { pharma: []; refresh: number }
> {
  static contextType = UserContext;
  constructor(props: PharmaCheckProps) {
    super(props);
    this.state = {
      pharma: [],
      refresh: 1, // force page refresh after an update
    };
    this.setRefresh = this.setRefresh.bind(this);
  }

  componentDidMount() {
    this.props.navigation.addListener(
      "focus",
      async () => await this.updatePharmaChecks()
    );
    this.updatePharmaChecks();
  }

  componentWillUnmount() {
    this.props.navigation.removeListener(
      "focus",
      async () => await this.updatePharmaChecks()
    );
  }

  async updatePharmaChecks() {
    let checks = await getChecks(
      this.context.token,
      this.context.currentBaseId
    );

    checks = checks.pharma.map((item) => {
      item.date = new Date((item.date as string).substr(0, 10));
      return item;
    });

    this.setState((state, props) => {
      let newState = { ...state, pharma: checks };
      return newState;
    });
  }

  setRefresh(refresh: number) {
    this.setState({
      refresh: refresh,
    });
  }

  async send(token: string, item: object) {
    try {
      let response = await postPharmaChecks(token, item);

      if (response.status === 200) {
        onSuccessToast();
        this.setRefresh(
          this.state.refresh % 2 == 0
            ? this.state.refresh - 1
            : this.state.refresh + 1
        ); //TODO fix later doesn't remount the component link : https://www.nikgraf.com/blog/using-reacts-key-attribute-to-remount-a-component
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
      <View
        style={{ flex: 1, justifyContent: "center" }}
        key={this.state.refresh}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 8 }}>
          à {this.context.currentBaseName}
        </Text>
        {this.state.pharma ? (
          <ScrollView>
            {this.state.pharma.map((item, index) => {
              return <CheckCard item={item} handler={this.send} key={index} />;
            })}
          </ScrollView>
        ) : (
          <Text>Rine</Text>
        )}
      </View>
    );
  }
}
