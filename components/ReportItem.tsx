import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ReportItemProps {
  id: number;
  base: string;
  date: string;
  week: number;
  navigation: object;
}
export default class ReportItem extends Component<ReportItemProps> {
  constructor(props: ReportItemProps) {
    super(props);
  }

  render() {
    const { id, base, date, week } = this.props;

    return (
      <TouchableOpacity
        key={id}
        onPress={() =>
          this.props.navigation.push("ReportDetails", { reportId: id })
        }
        style={{
          padding: 16,
          marginVertical: 4,
          marginHorizontal: 8,
          borderRadius: 4,
          backgroundColor: "#cacaca",
        }}
      >
        <Text>
          {base} {date ?? week}
        </Text>
      </TouchableOpacity>
    );
  }
}
