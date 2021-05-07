import React, { Component } from "react";

type Props = {
  name: string;
};

type State = {
  nameState: string;
};

export default class Hello extends Component<Props, State> {
  static defaultProps = {
    name: "Undefined",
  };

  constructor({ name }: Props) {
    super({ name });
  }

  render() {
    return <React.Fragment>Bonjour {this.props.name}</React.Fragment>;
  }
}
