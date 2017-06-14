// ES6
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import React from "react";
import { Marker, Cluster } from "react-mapbox-gl";
import config from "../config.json";

const { accessToken} = config;


const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    border: '2px solid #56C498',
    pointerEvents: 'none'
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9',
    pointerEvents: 'none'
  }
}

class CrimeMap extends React.Component {
  onMarkerClick(coords) {
   console.log(coords);
 }

 clusterMarker = (coordinates, pointCount) => {
   return(
   <Marker coordinates={coordinates} key={coordinates.toString()} style={styles.clusterMarker}>
     { pointCount }
   </Marker>
  )

 };
 getVisibleCrime = (crime, crimetype) => {
   switch (crimetype) {
    case "Total Crime":
      return crime.total_crime
    case "Break and Enter - Business":
      return crime.baeb
    case "Break and Enter - Residence":
      return crime.baer
    case "Shoplifting":
      return crime.shoplifting
    case "Theft from Motor Vehicle":
      return crime.tfmv
    case "Theft of Motor Vehicle":
      return crime.tomv

   }
 }
  render() {
    var { crimelocations, crimetype } = this.props
    var crimelocations = crimelocations.slice(1,100)
    debugger;
    return (

    <div>
      <ReactMapboxGl
        style="mapbox://styles/mapbox/streets-v8"
        accessToken={accessToken}
        center= {[-122.801094, 49.10443]}
        containerStyle={{
          height: "80vh",
          width: "80vw"
        }}>
        <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={8}>

        {
        crimelocations.map((crimelocation, key) => {
          return (
          <Marker
            key={key}
            style={styles.marker}
            coordinates={crimelocation.geometry.coordinates}
            onClick={this.onMarkerClick.bind(this, crimelocation.geometry.coordinates)}
          >
            {this.getVisibleCrime(crimelocation.crime, crimetype)}
          </Marker>
          )
        })
        }




          </Cluster>
      </ReactMapboxGl>
    </div>
    )
  }
}

export default CrimeMap;
