import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

interface ReportProps {
  data?: [];
}

interface ReportItemProps {
  id: number;
  base: string;
  date: string;
  week: number;
}

class ReportItem extends Component<ReportItemProps> {
  constructor(props: ReportItemProps) {
    super(props);
  }
  render() {
    const { id, base, date, week } = this.props;
    return (
      <TouchableOpacity
        key={id}
        onPress={() => console.log(id)}
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

export default class Report extends Component<ReportProps> {
  constructor(props: ReportProps) {
    super(props);
  }

  renderItem = ({ item }: { item: any }) =>
    item ? <ReportItem {...item} /> : "";

  render() {
    const { data } = this.props;

    return (
      <View>
        {data ? (
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
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
