import React, { Component } from 'react';
import {ScrollView, View, Text} from 'react-native';
import Tile from './Tile'
import styles from './Style'
import {flatColors} from './flatColors'

export default class ColorPicker extends Component {
  render(){
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.colors}>
          {flatColors.map( (color) => {
            return <Tile key={color} color={`#${color}`} onPress={ () => this.props.changeTo(color)}><Text>{color}</Text></Tile>
          })}
        </View>
      </ScrollView>
    )
  }
}
