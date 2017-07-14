import React, { Component } from 'react';
import {View, Text} from 'react-native'
import timer from 'react-native-timer';
import styles from './Style'
import {randomColor} from './flatColors'

export default class ClassName extends Component {
  constructor(props){
    super(props)
    this.state = {
      secondsLeft: 5
    }

    this.countDown = this.countDown.bind(this);
  }

  countDown(){
    if (this.state.secondsLeft <= 0){
      this.setState({secondsLeft: 5}, this.props.fetchNewColor)
    } else {
      this.setState({secondsLeft: (this.state.secondsLeft -1)})
    }
  }
  componentWillUnmount() {
    timer.clearInterval(this);
  }

  componentDidMount(){
    timer.setInterval( this, 'newColor', this.countDown, 1000)
  }
  render(){
    return (
      <View style={{
          height: 300,
          width: 800,
          borderWidth: 1,
          borderColor: '#7f8c8d',
          backgroundColor: `#${this.props.color}`
        }}>
        <Text style={styles.header}>{this.props.color}</Text>
          <Text style={styles.header}>{this.state.secondsLeft}...</Text>

      </View>
    )
  }
}
