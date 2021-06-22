import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import postConfirmWorkplan from "../api/postConfirmWorkplan";
import { UserContext } from "../contexts/userContext";
import {
  onSuccessToast,
  onNotPermittedToast,
  onErrorToast,
} from "../utils/toast";

interface TimetableItemProps {
  item: object;
}

export default class TimetableItem extends Component<TimetableItem> {
  static contextType = UserContext;
  constructor(props: TimetableItemProps) {
    super(props);
    this.state = {
      item: this.props.item,
      showReason: false,
    };
  }

  async reject() {
    if (
      (this.state.showReason == false && this.state.item.reason == null) ||
      this.state.item.reason.length < 3
    ) {
      this.setState({
        showReason: true,
        item: { ...this.state.item, confirmation: 0 },
      });
      return false;
    } else {
      await this.send(this.state.item);
    }
  }

  async validate() {
    this.setState({
      item: { ...this.state.item, confirmation: 1, reason: null },
    });
    await this.send(this.state.item);
  }

  async send(item: object) {
    try {
      let response = await postConfirmWorkplan(this.context.token, item);

      if (response.status === 200) {
        onSuccessToast();
        this.setState({
          item: {},
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

  render() {
    const { date, reason } = this.state.item;
    const { code, type } = this.state.item.worktime;
    return this.state.item != {} ? (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          padding: 16,
          marginVertical: 4,
          marginHorizontal: 8,
          borderRadius: 4,
          backgroundColor: "#cacaca",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {new Date(date).toISOString().substr(0, 10)} - Code : {code}
          </Text>
          <Text>Type : {type}</Text>
          {this.state.showReason ? (
            <TextInput
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 4,
                borderRadius: 4,
              }}
              maxLength={50}
              value={this.state.item.reason}
              onChangeText={(text) => {
                this.setState({ item: { ...this.state.item, reason: text } });
              }}
            />
          ) : null}
        </View>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            style={{ minWidth: 64, minHeight: 32, backgroundColor: "#ff0000" }}
            onPress={() => this.reject()}
          >
            <Text>Refuser</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ minWidth: 64, minHeight: 32, backgroundColor: "#00ff00" }}
            onPress={() => this.validate()}
          >
            <Text>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
  }
}
