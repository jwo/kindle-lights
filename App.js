import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import colors from './colors';
import timer from 'react-native-timer';

const flatColors = [
  "1abc9c",
  "16a085",
  "f1c40f",
  "f39c12",
  "2ecc71",
  "27ae60",
  "e67e22",
  "d35400",
  "3498db",
  "2980b9",
  "e74c3c",
  "c0392b",
  "9b59b6",
  "8e44ad",
  "ecf0f1",
  "bdc3c7",
  "34495e",
  "2c3e50",
  "95a5a6",
  "7f8c8d"
]

const randomColor = () => {
  return flatColors[Math.floor(Math.random() * flatColors.length)]
}

export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      color: randomColor(),
      one: {
        on: false,
        bri: 200,
        hue: 22222,
        sat: 200,
      },
      two: {
        on: false,
        bri: 200,
        hue: 22222,
        sat: 200,
      }
    }
    this.fetchLights = this.fetchLights.bind(this);
    this.changeTo = this.changeTo.bind(this)
    this.fetchNewColor = this.fetchNewColor.bind(this)
  }

  fetchLights(){
    fetch("http://172.16.2.103/api/uZp8dabwbOPso1PevxxC4vlpVU-fWXgCw7I6Mbja/lights")
    .then( (r) => r.json())
    .then( (data) => {
      this.setState({
        one: data[1].state,
        two: data[2].state
      })
    })
  }

  componentWillUnmount() {
    timer.clearTimeout(this);
  }


  componentDidMount(){
    console.log("Mounted at " + (new Date()))
    this.changeTo(this.state.color)
    timer.setInterval( this, 'newColor', this.fetchNewColor, 5000)
  }

  fetchNewColor(){
    const newColor = randomColor()
    this.changeTo(newColor)
  }

  changeTo(rgbValue){
    console.log("changeTo at " + (new Date()))

    this.setState({
      color: rgbValue
    })
    const xy = colors().getCIEColor(rgbValue)
    const lights = [1,2]
    lights.forEach((i) => {
      console.log("Sending to " + i)
      fetch(`http://172.16.2.103/api/uZp8dabwbOPso1PevxxC4vlpVU-fWXgCw7I6Mbja/lights/${i}/state`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          xy: xy
        })
      })
      .then( (r) => {
        console.log(r)
        return r;
      })
      .then( (r) => r.json() )
      .then( (j) => console.log(j))
      .then(this.fetchLights)
      .catch( (e) => console.log(e))

    })


  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>JWo Lights and Display contest</Text>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={{fontWeight: 'bold'}}>Light 1</Text>

            <Text>On: {this.state.one.on}</Text>
            <Text>bri: {this.state.one.bri}</Text>
            <Text>hue: {this.state.one.hue}</Text>
            <Text>sat: {this.state.one.sat}</Text>

          </View>
          <View style={styles.column}>
            <Text style={{fontWeight: 'bold'}}>Light 2</Text>
            <Text>On: {this.state.two.on}</Text>
            <Text>bri: {this.state.two.bri}</Text>
            <Text>hue: {this.state.two.hue}</Text>
            <Text>sat: {this.state.two.sat}</Text>
          </View>
        </View>

        <View style={{
            height: 300,
            width: 800,
            borderWidth: 1,
            borderColor: '#7f8c8d',
            backgroundColor: `#${this.state.color}`
          }}>
          <Text style={styles.header}>{this.state.color}</Text>

        </View>


</View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 42,
    fontWeight: 'bold',
    margin: 30,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    padding: 20
  }
});
