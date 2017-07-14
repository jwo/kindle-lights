import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import colorUtility from './colorUtility';
import {flatColors,randomColor} from './flatColors';
import Tile from './Tile';
import styles from './Style';
import NavTile from './NavTile';
import ColorPicker from './ColorPicker';
import Status from './Status';
import RandomColors from './RandomColors';
import { NativeRouter, Route, Link } from 'react-router-native'


const Home = () => (
  <Text style={styles.header}>JWo Lights and Display contest</Text>
)

export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      color: randomColor(),
      one: {
        on: 'unknown',
        bri: -1,
        hue: -1,
        sat: -1,
      },
      two: {
        on: 'unknown',
        bri: -1,
        hue: -1,
        sat: -1,
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

  fetchNewColor(){
    const newColor = randomColor()
    this.changeTo(newColor)
  }

  changeTo(rgbValue){
    console.log("changeTo at " + (new Date()))

    this.setState({
      color: rgbValue
    })
    const xy = colorUtility().getCIEColor(rgbValue)
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





        <NativeRouter>
          <View>
          <Route exact path="/" component={Home}/>

          <View style={styles.nav}>
            <NavTile to="/" text="Home" color="#9b59b6"/>
            <NavTile to="/colors" text="Color Picker" color="#c0392b"/>
            <NavTile to="/random" text="Random" color="#f1c40f"/>
            <NavTile to="/status" text="Status" color="#2980b9"/>
          </View>

          <Route path="/colors" render={()=>(
              <ColorPicker changeTo={this.changeTo}/>
            )}
          />

          <Route path="/random" render={()=>(
              <RandomColors fetchNewColor={this.fetchNewColor} color={this.state.color}/>
            )}
          />

          <Route path="/status" render={()=>(
              <Status fetchLights={this.fetchLights} one={this.state.one} two={this.state.two}/>
            )}
          />
          </View>
        </NativeRouter>

      </View>
    );
  }
}
