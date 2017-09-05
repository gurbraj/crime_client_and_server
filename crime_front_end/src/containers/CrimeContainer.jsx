import React from "react";
import { connect } from "react-redux";
import Actions from "../actions";
import CrimeMap from "../components/CrimeMap";
import CircularProgress from 'material-ui/CircularProgress';
import '../App.css';
import CrimeOptions from "../components/CrimeOptions";

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
    },
    loadingData(boolean) {
      dispatch(Actions.loadingData(boolean))
    }

  })
};

function mapStateToProps(state) {
  return ({
    data: state.data.data,
    loading: state.data.loading,
    crimetype: state.crimeoptions.crimetype,
    crimetime: state.crimeoptions.crimetime
  })
};

class CrimeContainer extends React.Component {
  componentDidMount() {
    //this.props.fetchData("http://localhost:4000/crime_aggregated");
    this.props.loadingData(true)
    setTimeout(() => { return  this.props.loadingData(false)}, 10000 )
    //use for loading hydrated state
  }

  render() {
    const {loading, data, crimetype, handleCrimeOptionsType, crimetime, handleCrimeOptionsTime} = this.props;
    return (
      <div>

        <div id="crime-map-div">
          <CrimeOptions crimetype={crimetype} handleCrimeOptionsType={handleCrimeOptionsType} handleCrimeOptionsTime={handleCrimeOptionsTime} crimetime={crimetime} />
          { data.crimelocations && <CrimeMap crimelocations={data.crimelocations} crimetype={crimetype}/> }

          {this.props.loading &&
            <div id="crime-container-loading">
            <CircularProgress size={160} thickness={7} color="black" />
            <p id="crime-container-loading-text">Loading data </p>
            </div>
          }
        </div>


      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CrimeContainer);
