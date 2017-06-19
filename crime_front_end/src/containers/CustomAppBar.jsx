import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
//import IconMenu from "material-ui/IconMenu";
//import MenuItem from "material-ui/MenuItem";
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
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
      <AppBar title="Surrey Crime Spots (Work in progress)" iconElementLeft={<IconButton><img src ="../../crimelogo.png" height="38" width="38" style={{float:"left"}} /></IconButton>}  iconElementRight={<FlatButton><NavLink to="/about" style={{color: "white"}}>About</NavLink></FlatButton>} style={{backgroundColor: "black"}}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar);
