import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import getChecks from "../../api/getChecks";
import CheckCard from "../../components/CheckCard";
import { UserContext } from "../../contexts/userContext";
import { ReportsDrugsParamList } from "../../navigation/ReportDrugsStackNavigator";
import postNovaChecks from "../../api/postNovaChecks";

import {
  onSuccessToast,
  onNotPermittedToast,
  onErrorToast,
} from "../../utils/toast";

export type NovaCheckProps = StackScreenProps<
  ReportsDrugsParamList,
  "ReportsDrugsTopTab"
>;

export default class NovaCheck extends Component<
  NovaCheckProps,
  { nova: []; refresh: number }
> {
  static contextType = UserContext;
  constructor(props: NovaCheckProps) {
    super(props);
    this.state = {
      nova: [],
      refresh: 1, // force page refresh after an update
    };
    this.setRefresh = this.setRefresh.bind(this);
  }

  componentDidMount() {
    this.props.navigation.addListener(
      "focus",
      async () => await this.updateNovaChecks()
    );
    this.updateNovaChecks();
  }

  componentWillUnmount() {
    this.props.navigation.removeListener(
      "focus",
      async () => await this.updateNovaChecks()
    );
  }

  async updateNovaChecks() {
    let checks = await getChecks(
      this.context.token,
      this.context.currentBaseId
    );

    checks = checks.nova.map((item) => {
      item.date = new Date((item.date as string).substr(0, 10));
      return item;
    });

    this.setState((state, props) => {
      let newState = { ...state, nova: checks };
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
      let response = await postNovaChecks(token, item);
      console.log("hallo");
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
        {this.state.nova ? (
          <ScrollView>
            {this.state.nova.map((item, index) => {
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
