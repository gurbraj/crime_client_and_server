import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
//import IconMenu from "material-ui/IconMenu";
//import MenuItem from "material-ui/MenuItem";

import AppBar from "material-ui/AppBar";

function mapDispatchToProps(dispatch) {
  return ({
  })
}

function mapStateToProps(state) {
  return ({})
}
export class CustomAppBar extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <AppBar title="Crime" iconElementRight={<NavLink to="/about">About</NavLink>} style={{backgroundColor: "black"}}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar);
