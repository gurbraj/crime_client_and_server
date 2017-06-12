// ES6
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import React from "react";
class CrimeMap extends React.Component {
  render() {
    return (

      <div>
        <ReactMapboxGl
          style="mapbox://styles/mapbox/streets-v8"
          accessToken="pk.eyJ1IjoiZ25ha2duYWsiLCJhIjoiY2ozdHJpbHQ0MDA4NTJ4bnhueDZpd3VyYyJ9.4lw0GwmoOy0REgXQvZLodA"
          center= {[-122.801094, 49.104430]}
          containerStyle={{
            height: "80vh",
            width: "100vw"
          }}>
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}>
              <Feature coordinates={[-122.801094, 49.104430]}/>
            </Layer>
        </ReactMapboxGl>
      </div>
    )
  }
}

export default CrimeMap;
