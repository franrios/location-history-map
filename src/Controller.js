import React from "react"
import { NavigationControl } from "react-map-gl"
import * as MDIcons from "react-icons/lib/md"

export function Controller (props) {
  const {
    onFlightClicked,
    onLocationClicked,
    showLocations,
    showFlights,
    onViewportChange,
  } = props

  return (
    <div className='controller'>
      <div style={{ marginBottom: 10 }} onClick={() => onFlightClicked()}>
        {!showFlights ? (
          <MDIcons.MdAirplanemodeActive size={25} color="#F0F0F0" />
        ) : (
          <MDIcons.MdAirplanemodeInactive size={25} color="#F0F0F0" />
        )}
      </div>
      <div style={{ marginBottom: 10 }} onClick={() => onLocationClicked()}>
        {!showLocations ? (
          <MDIcons.MdLocationOn size={25} color="#F0F0F0" />
        ) : (
          <MDIcons.MdLocationOff size={25} color="#F0F0F0" />
        )}
      </div>
      <NavigationControl onViewportChange={vp => onViewportChange(vp)} />
    </div>
  )
}
