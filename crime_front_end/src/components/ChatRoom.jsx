import React from "react";


class ChatRoom extends React.Component {
  render() {
    return (
      <div>
        this is chatroom {this.props.messages}
        </div>
    )    
  }
}

export default ChatRoom;
