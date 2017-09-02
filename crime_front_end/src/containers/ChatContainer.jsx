import React from "react";
import { connect } from "react-redux";
import Actions from "../actions";
import ChatRoom from "../components/ChatRoom";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import AddUserDialog from "./AddUserDialog";
const url = "http://localhost:4000"

function mapDispatchToProps(dispatch) {
  return ({
    fetchChatData() {

    },
    addContact(phoneNumber) {
      //let phoneNumber = prompt("add phone number, EX: +17787070030")

      fetch(url + "/contacts/new",
        {method: "POST",
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({phone_number:phoneNumber})
        }
      ).then(res => res.json())
      .then(contact=> {

        dispatch(Actions.contactAdded(contact.phone_number))
      })
    }
  })
}
function mapStateToProps(state) {
  return ({
    contacts: state.contacts
  })
}

class ChatContainer extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <br/>
        <br/>
        <List>
          <AddUserDialog addContact={this.props.addContact}/>
          {this.props.contacts && this.props.contacts.map(contact => {return <ListItem primaryText={contact} style={{width:"300px"}} leftIcon={<CommunicationCall color={"black"}/>} />})}
        </List>
        <br/>
        <br/>
        <ChatRoom messages="placeholder message"/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ChatContainer);
