import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { UserContext } from "../contexts/userContext";

interface CheckProps {
  item: object;
  index?: number;
  handler: Function;
}

interface CheckState {
  item: object;
  startValid: boolean;
  endValid: boolean;
}

export default class CheckModal extends Component<CheckProps, CheckState> {
  static contextType = UserContext;
  constructor(props: CheckProps) {
    super(props);
    this.state = {
      item: props.item,
      startValid: false,
      endValid: false,
    };
  }

  componentDidMount() {
    this.checkTypeValue();
  }

  checkTypeValue() {
    this.setState({
      startValid: typeof this.state.item.start === "number",
      endValid: typeof this.state.item.end === "number",
    });
  }

  handleChangeStart(start) {
    this.setState({ item: { ...this.state.item, start: start } });
    this.checkTypeValue();
  }

  handleChangeEnd(end) {
    this.setState({ item: { ...this.state.item, end: end } });
    this.checkTypeValue();
  }

  formatDate(date: Date) {
    let formatDate = new Date(date);

    return (
      formatDate.getDate() +
      "/" +
      formatDate.getMonth().toLocaleString("fr-CH") +
      "/" +
      formatDate.getFullYear()
    );
  }
  render() {
    const { id, batch_number, date, drug, start, end, nova } = this.state.item;
    return (
      <View
        style={{
          flex: 1,
          padding: 16,
          marginVertical: 4,
          marginHorizontal: 8,
          borderRadius: 4,
          backgroundColor: "#cacaca",
        }}
      >
        <Text
          style={{
            margin: "auto",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {batch_number
            ? "Du lot " + batch_number + " de " + drug
            : drug + " de la nova " + nova}
        </Text>
        <Text>pour le {this.formatDate(date)}</Text>
        <View
          style={{
            flex: 1,
            flexWrap: "nowrap",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <View style={{ flex: 1, marginRight: 4 }}>
            <Text>Matin</Text>
            <TextInput
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 4,
                borderRadius: 4,
              }}
              defaultValue={start ? start.toString() : ""}
              keyboardType="numeric"
              onChangeText={(start) => this.handleChangeStart(start)}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 4 }}>
            <Text>Soir</Text>
            <TextInput
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 4,
                borderRadius: 4,
              }}
              defaultValue={end ? end.toString() : ""}
              keyboardType="numeric"
              onChangeText={(end) => this.handleChangeEnd(end)}
            />
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <Button
            title="Mettre à jour"
            onPress={() => {
              this.props.handler(this.context.token, this.state.item);
            }}
          />
        </View>
      </View>
    );
  }
}
