import React from "react";
import { connect } from "react-redux";
import Actions from "../actions";
import ChatRoom from "../components/ChatRoom";
const url = "http://localhost:4000"

function mapDispatchToProps(dispatch) {
  return ({
    fetchChatData() {

    },
    addContact() {
      let phoneNumber = prompt("add phone number, EX: +17787070030")
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
        <button onClick={this.props.addContact}>this is da chatcontainer</button>
        {this.props.contacts}
        <ChatRoom messages="placeholder message"/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ChatContainer);
