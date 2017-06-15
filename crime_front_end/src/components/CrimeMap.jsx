// ES6
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import React from "react";
import { Marker, Cluster } from "react-mapbox-gl";
import config from "../config.json";

const { accessToken } = config;


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
    width: 10,
    height: 10,
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

 }
 getVisibleCrime = (crime, crimetype) => {

   const markerStyle =  {
       width: 10,
       height: 10,
       borderRadius: '50%',
       backgroundColor: '#E0E0E0',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       border: '2px solid #C9C9C9',
       pointerEvents: 'none'
     }

   const markerConfig = {crimevolume: "", markerstyle: markerStyle }


   switch (crimetype) {
    case "Total Crime":
      //return crime.total_crime
      markerConfig.crimevolume = crime.total_crime
      markerConfig.markerstyle.backgroundColor = 'black'
      break;
    case "Break and Enter - Business":

      //return crime.baeb
      markerConfig.crimevolume = crime.baeb
      markerConfig.markerstyle.backgroundColor = 'red'
      markerConfig.markerstyle.width = 3 * crime.baeb
      markerConfig.markerstyle.height = 3 * crime.baeb

      break;
    case "Break and Enter - Residence":
      //return crime.baer
    case "Shoplifting":
      //return crime.shoplifting
    case "Theft from Motor Vehicle":
      //return crime.tfmv
    case "Theft of Motor Vehicle":
      //return crime.tomv
   }
   return markerConfig
 }
  render() {
    var { crimelocations, crimetype } = this.props
    var crimelocations = crimelocations.slice(1, 10000)

    return (

    <div>
      <ReactMapboxGl
        style="mapbox://styles/mapbox/streets-v8"
        accessToken={accessToken}
        center= {[-122.801094, 49.10443]}
        containerStyle={{
          height: "80vh",
          width: "100vw"
        }}>
        <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={8}>

        {
        crimelocations.map((crimelocation, key) => {
          let markerConfig = this.getVisibleCrime(crimelocation.crime, crimetype)

          let crimevolume = markerConfig.crimevolume
          let markerStyle = markerConfig.markerstyle

          // let crimevolume = this.getVisibleCrime(crimelocation.crime, crimetype)
          if (crimevolume > 1) {

            return (
            <Marker
              key={key}
              style={markerStyle}
              coordinates={crimelocation.geometry.coordinates}
              onClick={this.onMarkerClick.bind(this, crimelocation.geometry.coordinates)}
            >
              {crimevolume}
            </Marker>
            )
          } else {
            return ""
          }

        })
        }




          </Cluster>
      </ReactMapboxGl>
    </div>
    )
  }
}

export default CrimeMap;
