// ES6
//import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import React from "react";
import ReactMapboxGl, { Marker, Cluster, ZoomControl } from "react-mapbox-gl";
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
       pointerEvents: 'none',
       opacity: 0.5
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
      markerConfig.crimevolume = crime.baer
      markerConfig.markerstyle.backgroundColor = 'blue'
      markerConfig.markerstyle.width = 3 * crime.baer
      markerConfig.markerstyle.height = 3 * crime.baer

      break;
    case "Shoplifting":
      //return crime.shoplifting
      markerConfig.crimevolume = crime.shoplifting
      markerConfig.markerstyle.backgroundColor = 'green'
      markerConfig.markerstyle.width = 3 * crime.shoplifting
      markerConfig.markerstyle.height = 3 * crime.shoplifting

      break;
    case "Theft from Motor Vehicle":
      //return crime.tfmv
      markerConfig.crimevolume = crime.tfmv
      markerConfig.markerstyle.backgroundColor = 'orange'
      markerConfig.markerstyle.width = 3 * crime.tfmv
      markerConfig.markerstyle.height = 3 * crime.tfmv

      break;
    case "Theft of Motor Vehicle":
      //return crime.tomv
      markerConfig.crimevolume = crime.tomv
      markerConfig.markerstyle.backgroundColor = 'purple'
      markerConfig.markerstyle.width = 3 * crime.tomv
      markerConfig.markerstyle.height = 3 * crime.tomv

      break;

   }

   if (markerConfig.crimevolume > 10) {
     //then max size lets say
     markerConfig.markerstyle.width = 10
     markerConfig.markerstyle.height = 10
   }

   return markerConfig
 }

  render() {

    var { crimelocations, crimetype } = this.props
    var crimelocations = crimelocations.slice(1, crimelocations.length-1)

    if (crimetype === "Total Crime" ) {
      return (
        <div>

          <ReactMapboxGl
            style="mapbox://styles/mapbox/streets-v8"
            accessToken={accessToken}
            center= {[-122.801094, 49.14443]}
            zoom={[10]}
            containerStyle={{
              height: "80vh",
              width: "90vw",
              position: "relative",
              margin: "auto",
              borderRadius: "5px"
            }}>
            <ZoomControl/>
            <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={8}>

            {
            crimelocations.map((crimelocation, key) => {

                let markerConfig = this.getVisibleCrime(crimelocation.crime, "Break and Enter - Business")
                let crimevolume = markerConfig.crimevolume
                let markerStyle = markerConfig.markerstyle

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
            <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={8}>

            {
            crimelocations.map((crimelocation, key) => {

                let markerConfig = this.getVisibleCrime(crimelocation.crime, "Break and Enter - Residence")
                let crimevolume = markerConfig.crimevolume
                let markerStyle = markerConfig.markerstyle

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
            <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={8}>

            {
            crimelocations.map((crimelocation, key) => {

                let markerConfig = this.getVisibleCrime(crimelocation.crime, "Theft from Motor Vehicle")
                let crimevolume = markerConfig.crimevolume
                let markerStyle = markerConfig.markerstyle

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
            <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={8}>

            {
            crimelocations.map((crimelocation, key) => {

                let markerConfig = this.getVisibleCrime(crimelocation.crime, "Shoplifting")
                let crimevolume = markerConfig.crimevolume
                let markerStyle = markerConfig.markerstyle

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
            <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={8}>

            {
            crimelocations.map((crimelocation, key) => {

                let markerConfig = this.getVisibleCrime(crimelocation.crime, "Theft of Motor Vehicle")
                let crimevolume = markerConfig.crimevolume
                let markerStyle = markerConfig.markerstyle

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
          <div id="crime-map-legend">
            <div><span style={{backgroundColor: "red"}}></span>Break and Enter - Business</div>
            <div><span style={{backgroundColor: "blue"}}></span>Break and Enter - Residence</div>
            <div><span style={{backgroundColor: "green"}}></span>Shoplifting</div>
            <div><span style={{backgroundColor: "orange"}}></span>Theft from Motor Vehicle</div>
            <div><span style={{backgroundColor: "purple"}}></span>Theft of Motor Vehicle</div>
          </div>
        </div>


      )
    } else  {

      return (

      <div>
        <ReactMapboxGl
          style="mapbox://styles/mapbox/streets-v8"
          accessToken={accessToken}
          center= {[-122.801094, 49.14443]}
          zoom={[10]}
          containerStyle={{
            height: "80vh",
            width: "90vw",
            position: "relative",
            margin: "auto",
            borderRadius: "5px"
          }}>
          }}>
          <ZoomControl/>
          <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={8}>

          {
          crimelocations.map((crimelocation, key) => {

              let markerConfig = this.getVisibleCrime(crimelocation.crime, crimetype)
              let crimevolume = markerConfig.crimevolume
              let markerStyle = markerConfig.markerstyle

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
}

export default CrimeMap;
