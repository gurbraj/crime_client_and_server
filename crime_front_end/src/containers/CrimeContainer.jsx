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
}

function mapStateToProps(state) {
  return ({
    data: state.data.data,
    loading: state.data.loading
  })
}

class CrimeContainer extends React.Component {
  componentDidMount() {
    this.props.fetchData("http://localhost:4000/crime")
  }
  render() {
    return (
      <div>
      {this.props.loading? "LOADING" : ""}
      this is the crime container!
      <button onClick={() => this.props.fetchData("sds")}>load some data</button>
      {JSON.stringify(this.props.data)}
      <CrimeMap/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CrimeContainer);
