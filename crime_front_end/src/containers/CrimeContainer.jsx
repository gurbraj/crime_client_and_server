import React from "react";
import { connect } from "react-redux";
import Actions from "../actions";

function mapDispatchToProps(dispatch) {
  return ({
    fetchData() {
      dispatch(Actions.fetchData())
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
    this.props.fetchData("sdsds")
  }
  render() {
    return (
      <div>
      {this.props.loading? "LOADING" : ""}
      this is the crime container!
      <button onClick={() => this.props.fetchData("sds")}>load some data</button>
      {JSON.stringify(this.props.data)}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CrimeContainer);
