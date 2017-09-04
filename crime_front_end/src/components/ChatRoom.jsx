import React from "react";
import openSocket from 'socket.io-client';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
const url = "http://localhost:4000"
const socket = openSocket(url)


class ChatRoom extends React.Component {
  componentDidMount() {
    let that = this;
    socket.on('chat message', function (messageObj) {
      console.log(messageObj)
      that.props.handleMessage(messageObj);

    })
    //socket.emit('chat message', "message from client");
  }
  render() {
    const style = {
                          height: 180 + 27 * 10,
                          width: 800,
                          marginTop: "210px",
                          textAlign: 'center',
                          display: 'inline-block',
                        };
    return (
      <div>
        <Paper style={style} zDepth={5}>
          <h2>Chat with {this.props.phoneNumber}</h2>
          <br/>
          <br/>
          <ul id="messages">
            {this.props.contactMessages &&
                this.props.contactMessages
                .map( (contactMessage) => {

                  if (contactMessage.incoming_message === true) {
                    return <li key={contactMessage._id}> <b> {this.props.contact}</b> : { contactMessage.body} </li>
                  } else {
                    return <li key={contactMessage._id}> <b> app </b> : { contactMessage.body} </li>
                  }
                })
            }
          </ul>
          <br/>
          <br/>
          <br/>
          <form action="" onSubmit={this.props.sendMessage}>
            <TextField id="message" hintText="write your message"/>
            <input id="phone_number" value={this.props.phoneNumber} style={{display: "none"}} onChange={() =>{}}/>
            <FlatButton label="Send" type="submit"/>
          </form>
        </Paper>
      </div>
    )
  }
}

export default ChatRoom;
