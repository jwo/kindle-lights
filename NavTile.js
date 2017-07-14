import React, { Component } from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import styles from './Style'
import {Link} from 'react-router-native'

export default class NavTile extends Component {
  render(){
    return (
      <Link to={this.props.to}>
        <View
          style={{padding: 40, alignItems: 'center',  backgroundColor: this.props.color}}
          >
        <Text style={{textAlign: 'center', color: 'white'}}>{this.props.text}</Text>
      </View>
      </Link>
    )
  }
}
