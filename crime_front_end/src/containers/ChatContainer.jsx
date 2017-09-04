import React from "react";
import { connect } from "react-redux";
import Actions from "../actions";
import ChatRoom from "../components/ChatRoom";

import {List, ListItem} from 'material-ui/List';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import AddUserDialog from "./AddUserDialog";
//const url = "http://localhost:4000"
const url = "https://surrey-crime-spots.herokuapp.com"

function mapDispatchToProps(dispatch) {
  return ({
    fetchChatData() {
      fetch(url + "/contacts")
      .then(res => res.json())
      .then(data => {
        let contacts = [];

        for (let i = 0; i < data.contacts.length; i++) {
          let contactObj = data.contacts[i];
          console.log(contactObj)
          let phoneNumber = contactObj.phone_number;
          let contactMessages = contactObj.messages;
          contacts.push(phoneNumber);
          dispatch(Actions.messagesFetched(contactMessages, phoneNumber));
        }

        dispatch(Actions.contactsFetched(contacts))

      })

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
    },
    launchChatRoom(e) {
      var phoneNumber = e.currentTarget.children[0].innerText
      var phoneNumber = phoneNumber.slice(0, phoneNumber.length - 1)
      dispatch(Actions.chatRoomLaunched(phoneNumber))
    },
    sendMessage(event) {
      event.preventDefault()

      let body = event.target.querySelector('#message').value;
      let phoneNumber= event.target.querySelector('#phone_number').value;

      //idea now is to write the message to the database, and send the message
      //directly through the socket through the action messageSent.
      //NOT wait for the server to have saved the message before emiting

      let messageObj = {phone_number: phoneNumber, body: body}
      dispatch(Actions.messageSent(messageObj))

      fetch(url + "/contacts/messages/new",
      { method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageObj)
      }
      )
      event.target.querySelector('#message').value = ""

    },
    handleMessage(messageObj) {
      dispatch(Actions.messageHandled(messageObj));
    }
  })
}
function mapStateToProps(state) {
  return ({
    contacts: state.contacts,
    phone_number: state.messages.phone_number,
    messages: state.messages
  })
}

class ChatContainer extends React.Component {
  componentDidMount() {
    this.props.fetchChatData()

  }
  render() {
    let phoneNumber = this.props.phone_number;
    let contactMessages = this.props.messages[phoneNumber]? this.props.messages[phoneNumber]: []
    return (
      <div>
        <br/>
        <br/>
        <div style={{width:"15%", float: "left", marginLeft: "2%"}}>
          <List style={{width: "200px"}}>
            <AddUserDialog addContact={this.props.addContact}/>
            {this.props.contacts && this.props.contacts.map(contact => {return <ListItem onClick={this.props.launchChatRoom} primaryText={contact} leftIcon={<CommunicationCall color={"black"}/>} />})}
          </List>
        </div>
        <br/>
        <br/>
        { phoneNumber && contactMessages && <ChatRoom contactMessages={contactMessages} phoneNumber={phoneNumber} sendMessage={this.props.sendMessage} handleMessage={this.props.handleMessage}/> }
        <p style={{position: "fixed", bottom: "10%", width:"100%", textAlign: "center"}}>Here you can add a canadian telephone number to chat about crime with. </p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ChatContainer);
