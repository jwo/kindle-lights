import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import styles from './Style';

export default class Tile extends React.Component{
  constructor(props){
    super(props)

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(){
    console.log("clicked on ", this.props.color)
    this.props.onPress();
  }
  render(){

    const newStyles = StyleSheet.flatten([styles.tile, {backgroundColor: this.props.color}])

    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={newStyles}
      >
        {this.props.children}
      </TouchableHighlight>
    )
  }
}
