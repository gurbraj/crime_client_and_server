import React from "react";
import { connect } from "react-redux";
import Actions from "../actions";
import CrimeMap from "../components/CrimeMap"

function mapDispatchToProps(dispatch) {
  return ({
    fetchData(url) {
      dispatch(Actions.fetchData(url))
    }

  })
};

function mapStateToProps(state) {
  return ({
    data: state.data.data,
    loading: state.data.loading
  })
};

class CrimeContainer extends React.Component {
  componentDidMount() {
    this.props.fetchData("http://localhost:4000/crime_aggregated");
  }
  render() {
    const {loading, data} = this.props;
    return (
      <div>
      {this.props.loading? "LOADING" : ""}
      this is the crime container!

      { data && <CrimeMap crimelocations={data.crimelocations_aggregated}/>}
      {JSON.stringify(this.props.data)}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CrimeContainer);
