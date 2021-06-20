import React, { Component, ReactNode } from "react";
import { View, ScrollView, Text } from "react-native";
import SquareButton from "./SquareButton";

export interface SquareButtonContainerProps {
  children: ReactNode;
  callback: Function;
}

export default class SquareButtonContainer extends Component<
  SquareButtonContainerProps,
  { selectedLocation: number | null }
> {
  constructor(props: SquareButtonContainerProps) {
    super(props);
    this.state = {
      selectedLocation: null,
    };
  }

  handleCallback = (data: any) => {
    this.setState({ selectedLocation: data.city });
    this.props.callback(this.state.selectedLocation);
  };

  render() {
    const childrenWithProps = React.Children.map(
      this.props.children,
      (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            callback: this.handleCallback,
          });
        }
        return child;
      }
    );
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Text>
          Ville selectionné : {this.state.selectedLocation ?? "Aucune"}
        </Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flex: 1,
            flexWrap: "wrap",
            margin: "auto",
          }}
          style={{ width: 312, height: 208, margin: "auto" }}
        >
          {childrenWithProps}
        </ScrollView>
      </View>
    );
  }
}
