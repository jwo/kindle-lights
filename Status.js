import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import styles from './Style'
export default class Status extends React.Component{

  componentWillMount(){
    this.props.fetchLights()
  }

  render(){
    return(
      <View style={[styles.row]}>
        <View style={styles.column}>
          <Text style={{fontWeight: 'bold'}}>Light 1</Text>

          <Text>On: {this.props.one.on}</Text>
          <Text>bri: {this.props.one.bri}</Text>
          <Text>hue: {this.props.one.hue}</Text>
          <Text>sat: {this.props.one.sat}</Text>

        </View>
        <View style={styles.column}>
          <Text style={{fontWeight: 'bold'}}>Light 2</Text>
          <Text>On: {this.props.two.on}</Text>
          <Text>bri: {this.props.two.bri}</Text>
          <Text>hue: {this.props.two.hue}</Text>
          <Text>sat: {this.props.two.sat}</Text>
        </View>
      </View>
    )
  }
}
