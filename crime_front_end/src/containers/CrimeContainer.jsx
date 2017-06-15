import React from "react";
import { connect } from "react-redux";
import Actions from "../actions";
import CrimeMap from "../components/CrimeMap";
import CircularProgress from 'material-ui/CircularProgress';
import '../App.css';
import CrimeOptions from "../components/CrimeOptions";

import { getVisibleData } from "../reducers";

function mapDispatchToProps(dispatch) {
  return ({
    fetchData(url) {
      dispatch(Actions.fetchData(url))
    },
    handleCrimeOptionsType(event, index, type) {
      dispatch(Actions.handleCrimeOptionsType(event, index, type) )
    }
    ,
    handleCrimeOptionsTime(event, index, time) {
      dispatch(Actions.handleCrimeOptionsTime(event, index, time) )
    }

  })
};
//current filtering flow is that getVisibleData, gets filtered by crimetime
//then this data gets passed down as prop to CrimeContainer, crimecontainer takes the data and aggregates crime,
//and then pass it as prop to crimemap

//CrimeMap then , takes care of filtering the aggregated crime data for crimetype.
function mapStateToProps(state) {
  return ({
    data: getVisibleData(state.data.data, state.crimeoptions.crimetime),
    loading: state.data.loading,
    crimetype: state.crimeoptions.crimetype,
    crimetime: state.crimeoptions.crimetime
  })
};

class CrimeContainer extends React.Component {
  componentDidMount() {
    this.props.fetchData("http://localhost:4000/crime_aggregated");
  }
  aggregateCrime(crimelocations) {
    //this function was previously on serverside.
    let dataArr = []

    crimelocations.forEach((crimelocation) =>{
      let hundred_block = crimelocation.hundred_block
      let hundred_block_geocoded = crimelocation.hundred_block_geocoded
      let geometry = crimelocation.geometry
      let aggregatedHash = {hundred_block: hundred_block, hundred_block_geocoded: hundred_block_geocoded, geometry: geometry , crime:{baeb:0, baer:0, shoplifting:0, tfmv:0, tomv:0,total_crime:0} }

      crimelocation.crimes.forEach((crime) => {

        aggregatedHash.crime.baeb += crime.baeb
        aggregatedHash.crime.baer += crime.baer
        aggregatedHash.crime.shoplifting += crime.shoplifting
        aggregatedHash.crime.tfmv += crime.tfmv
        aggregatedHash.crime.tomv += crime.tomv
        aggregatedHash.crime.total_crime += crime['total_crime']


      })
      dataArr.push(aggregatedHash)
    });
    return dataArr

  }
  render() {
    const {loading, data, crimetype, handleCrimeOptionsType, crimetime, handleCrimeOptionsTime} = this.props;

    if (data) {
      var crimelocationsAggregated = this.aggregateCrime(data.crimelocations);
    } else {
      var crimelocationsAggregated = [];
    }

    return (
      <div>
        <div>
        <CrimeOptions crimetype={crimetype} handleCrimeOptionsType={handleCrimeOptionsType} handleCrimeOptionsTime={handleCrimeOptionsTime} crimetime={crimetime} />
        { false && <CrimeMap crimelocations={crimelocationsAggregated} crimetype={crimetype}/> }
        </div>

        {this.props.loading &&
        <div id="crime-container-loading">
          <CircularProgress size={160} thickness={7} color="black" />
          <p id="crime-container-loading-text">Fetching data </p>
        </div>
        }

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CrimeContainer);
