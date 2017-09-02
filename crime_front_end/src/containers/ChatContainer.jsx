import React from "react";
import { connect } from "react-redux";
import Actions from "../actions";
import ChatRoom from "../components/ChatRoom";

function mapDispatchToProps(dispatch) {
  return ({
    fetchChatData() {

    }
  })
}
function mapStateToProps(state) {
  return ({
    contacts: "placeholder"
  })
}

class ChatContainer extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
        this is da chatcontainer
        <ChatRoom messages="placeholder message"/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ChatContainer);
