import React, { Component } from "react"
import ReactMapGL, { NavigationControl } from "react-map-gl"
import DeckGL, { ArcLayer, GridLayer } from "deck.gl"

import { MAPBOX_ACCESS_TOKEN } from "./.secrets"
import "./App.css"
import { getFlightTrips } from "./utils"

const locations = require("./location_history").locations
const locationHistory = locations.filter(
  (item, i) => i % Math.floor(locations.length / 300) === 0
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: 40.416775,
      longitude: -3.70379,
      zoom: 3.5,
      gridData: [],
      arcData: []
    } //Madrid location
  }

  componentDidMount() {
    const gridData = locations.map(({ longitudeE7, latitudeE7 }) => ({
      position: [longitudeE7 / 1e7, latitudeE7 / 1e7]
    }))
    const arcData = getFlightTrips(locations)
    this.setState({ gridData, arcData })
  }

  onViewportChange(viewport) {
    const { latitude, longitude, zoom } = viewport
    this.setState({ latitude, longitude, zoom })
  }

  render() {
    const { latitude, longitude, zoom, gridData, arcData } = this.state
    const { innerWidth: width, innerHeight: height } = window
    const viewport = {
      width,
      height,
      longitude,
      latitude,
      zoom,
      pitch: 0,
      bearing: 0
    }

    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={vp => this.onViewportChange(vp)}
        >
          <div style={{ position: "absolute", right: 10, bottom: 10 }}>
            <NavigationControl
              onViewportChange={vp => this.onViewportChange(vp)}
            />
          </div>
          <DeckGL
            {...viewport}
            layers={[
              new GridLayer({
                id: "grid-layer",
                data: gridData
              }),
              new ArcLayer({
                data: arcData,
                strokeWdith: 3
              })
            ]}
          />
        </ReactMapGL>
      </div>
    )
  }
}

export default App
