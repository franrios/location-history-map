import React, { Component } from "react"
import ReactMapGL from "react-map-gl"
import DeckGL, { ArcLayer, GridLayer } from "deck.gl"

import { MAPBOX_ACCESS_TOKEN } from "./.secrets"
import { Controller } from "./Controller"
import "./App.css"
import { getFlightTrips } from "./utils"

const locations = require("./location_history").locations
const locationHistory = locations.filter(
  (item, i) => i % Math.floor(locations.length / 300) === 0
)
// media 369766.87845576304
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: 40.416775, // Madrid location
      longitude: -3.70379,
      zoom: 3.5,
      gridData: [],
      arcData: [],
      showFlights: true,
      showLocations: true
    }
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
    const {
      latitude,
      longitude,
      zoom,
      gridData,
      arcData,
      showFlights,
      showLocations
    } = this.state
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
          <Controller
            showFlights={showFlights}
            showLocations={showLocations}
            onFlightClicked={() => this.setState({ showFlights: !showFlights })}
            onLocationClicked={() =>
              this.setState({ showLocations: !showLocations })
            }
            onViewportChange={vp => this.onViewportChange(vp)}
          />
          <DeckGL
            {...viewport}
            layers={[
              new GridLayer({
                id: "grid-layer",
                data: showLocations ? gridData : []
              }),
              new ArcLayer({
                data: showFlights ? arcData : [],
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
