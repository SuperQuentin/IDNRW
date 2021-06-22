import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import getUnconfirmedWorkplans from "../api/getUnconfirmedWorkplans";

import TimetableItem from "../components/TimetableItem";
import { UserContext } from "../contexts/userContext";
import {
  onSuccessToast,
  onNotPermittedToast,
  onErrorToast,
} from "../utils/toast";

export default class Timetable extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchUnconfirmedWorkplans();
  }

  async fetchUnconfirmedWorkplans() {
    try {
      let response = await getUnconfirmedWorkplans(this.context.token);

      if (response.status === 200) {
        onSuccessToast();
        this.setState({
          data: response.data,
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
    return (
      <View>
        {this.state.data != [] ? (
          <ScrollView>
            {this.state.data.map((item, index) => {
              return <TimetableItem item={item} key={index} />;
            })}
          </ScrollView>
        ) : (
          <Text>Vous avez confirmé tous vos horaires</Text>
        )}
      </View>
    );
  }
}
