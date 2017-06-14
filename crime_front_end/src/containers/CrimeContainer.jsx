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
    // ,
    // handleCrimeOptionsTime(time) {
    //
    // }

  })
};

function mapStateToProps(state) {
  return ({
    data: getVisibleData(state.data.data, "Total Crime"),
    loading: state.data.loading,
    crimetype: state.crimeoptions.crimetype
  })
};

class CrimeContainer extends React.Component {
  componentDidMount() {
    this.props.fetchData("http://localhost:4000/crime_aggregated");
  }
  componentDidUpdate() {
  }
  render() {
    const {loading, data, crimetype, handleCrimeOptionsType} = this.props;
    return (
      <div>
        {this.props.loading &&
        <div id="crime-container-loading">
          <CircularProgress size={120} thickness={7} color="black" />
          Fetching data
        </div>
        }

        <div>
          <CrimeOptions crimetype={crimetype} handleCrimeOptionsType={handleCrimeOptionsType} />
          { data && <CrimeMap crimelocations={data.crimelocations_aggregated} crimetype={crimetype}/> }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CrimeContainer);
