import React, { Component } from 'react'
import { View } from 'react-native'
import SquareButton from './SquareButton'

export interface SquareButtonContainerProps {
    children: SquareButton
}

export default class SquareButtonContainer extends Component<SquareButtonContainerProps>{
    constructor(props: SquareButtonContainerProps) {
        super(props)
    }

    render() {
        return (
            <View>
                {this.props.children}
            </View>
        )
    }
}