import React, { Component } from 'react';
import ReactMapGL, { Marker } from "react-map-gl"

import logo from './logo.svg';
import './App.css';

const MapboxAccessToken = 'pk.eyJ1IjoiZnJhbnJpb3MiLCJhIjoiY2pibXM5Z2k5M3I4dTMzbHB4NWJkanNyNSJ9.24SqQxgDaPDZMS2YT51AFA'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      latitude: 50,
      longitude: 50,
      zoom: 9
    }
  }

  componentWillMount () {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords
      this.setState({ latitude, longitude })
    })
  }
  render() {
    const { innerWidth: width, innerHeight: height } = window
    const { latitude, longitude, zoom } = this.state

    return <div>
        <ReactMapGL width={width} height={height} latitude={latitude} longitude={longitude} zoom={zoom} onViewportChange={viewport => {
            const { latitude, longitude, zoom } = viewport
            this.setState({latitude, longitude, zoom})
            // Optionally call `setState` and use the state to update the map.
          }}>
                  <Marker latitude={37.78} longitude={longitude + 0.001} latitude={latitude + 0.001} offsetLeft={-20} offsetTop={-10}>
          <div>You are here</div>
        </Marker>
          </ReactMapGL>
      </div>
  }
}

export default App;
