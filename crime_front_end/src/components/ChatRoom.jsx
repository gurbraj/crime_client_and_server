import React from "react";
import openSocket from 'socket.io-client';
const url = "http://localhost:4000"
const socket = openSocket(url)


class ChatRoom extends React.Component {
  componentDidMount() {
    let that = this;
    socket.on('chat message', function (messageObj) {
      console.log(messageObj)
    })
    socket.emit('chat message', "message from client");
  }
  render() {
    return (
      <div>
        this is chatroom {this.props.messages}
        </div>
    )
  }
}

export default ChatRoom;
