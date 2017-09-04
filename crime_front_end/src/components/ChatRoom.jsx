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
                          height: 180 + 100 + 27 * this.props.contactMessages.length,
                          width: 800,
                          marginTop: "100px",
                          textAlign: 'center',
                          display: 'inline-block',
                        };
    return (
      <div style={{marginLeft:"30%"}}>
        <Paper style={style} zDepth={5}>
          <br/>
          <h2>Chat with {this.props.phoneNumber}</h2>
          <br/>
          <br/>
          <ul id="messages">
            {this.props.contactMessages &&
                this.props.contactMessages
                .map( (contactMessage) => {

                  if (contactMessage.incoming_message === true) {
                    return <li key={contactMessage._id} className="incoming_message"> <b> {this.props.phoneNumber}</b> : { contactMessage.body} </li>
                  } else {
                    return <li key={contactMessage._id} className="outgoing_message"> <b> app </b> : { contactMessage.body} </li>
                  }
                })
            }
            <br/>

            <form action="" onSubmit={this.props.sendMessage} >
            <TextField id="message" hintText="write your message" underlineFocusStyle={{borderColor: "grey500"}}/>
            <input id="phone_number" value={this.props.phoneNumber} style={{display: "none"}} onChange={() =>{}}/>
            <FlatButton label="Send" type="submit"/>
            </form>
          </ul>
        </Paper>
      </div>
    )
  }
}

export default ChatRoom;
