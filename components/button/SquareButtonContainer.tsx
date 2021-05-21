import React, { Component, ReactNode } from "react";
import { View, ScrollView, Text } from "react-native";
import SquareButton from "./SquareButton";

export interface SquareButtonContainerProps {
  children: ReactNode;
}

export default class SquareButtonContainer extends Component<SquareButtonContainerProps> {
  constructor(props: SquareButtonContainerProps) {
    super(props);
    this.state = {
      selectedLocation: null,
    };
  }

  handleCallback = (data: any) => {
    this.setState({ selectedLocation: data.city });
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
      <View>
        <Text>Ville selectionné : {this.state.selectedLocation}</Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flex: 1,
            justifyContent: "space-between",
          }}
          style={{ width: 312, height: 208, margin: "auto" }}
        >
          {childrenWithProps}
        </ScrollView>
      </View>
    );
  }
}
