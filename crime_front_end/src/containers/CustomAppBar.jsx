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
      <div>
      <AppBar title={<FlatButton><NavLink className="custom-app-bar" to="/" >Surrey Crime Spots (work in progress)</NavLink> </FlatButton>} style={{backgroundColor: "black"}} iconElementLeft={<IconButton><img src ="../../crimelogo.png" height="33" width="33" style={{float:"left"}} /></IconButton>}  iconElementRight={<FlatButton><NavLink to="/about" className="custom-app-bar">About</NavLink></FlatButton>} style={{backgroundColor: "black"}}/>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar);
