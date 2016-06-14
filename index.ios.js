import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView
} from 'react-native';

import Api from './src/api';

class WeatherApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pin: {latitude: 37.7749, longitude: -122.4194},
      city: '',
      temp: '',
      desc: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView annotations={[this.state.pin]} onRegionChangeComplete={this.onRegionChangeComplete.bind(this)} style={styles.map}></MapView>
        <View style={styles.desc}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temp}</Text>
          <Text style={styles.text}>{this.state.desc}</Text>
        </View>
      </View>
    );
  }
  onRegionChangeComplete(region) {
    this.setState({
      pin: {
        latitude: region.latitude,
        longitude: region.longitude
      }
    });

    Api(region.latitude, region.longitude)
      .then((data) => {
        this.setState(data);
      });
      .catch((err) => {
        console.log(err);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 6,
    marginTop: 20
  },
  desc: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
});

AppRegistry.registerComponent('WeatherApp', () => WeatherApp);
