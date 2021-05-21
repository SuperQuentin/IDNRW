import React, { Component } from "react";

export interface SquareButtonProps {
  label: string;
  value: string;
  img?: string;
}

export default class SquareButtonContainer extends Component<SquareButtonProps> {}
