import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Actions from "../actions";

import AppBar from "material-ui/AppBar";
import { Route, Link } from 'react-router-dom'
function mapDispatchToProps(dispatch) {
  return ({
  })
}

function mapStateToProps(state) {
}
export class CustomAppBar extends React.Component {

  componentDidMount() {
  }

  render() {

    return (

      <AppBar title="Crime" iconElementRight={<Link to="/about">About</Link>} style={{backgroundColor: "black"}}/>



    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar);
