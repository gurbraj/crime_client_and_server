import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//let this componen have only internal state
export default class AddUserDialog extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleCloseSubmit = (e) => {
    let phone_number = e.target.querySelector('#phone_number').value;
    if (phone_number) {
      this.props.addContact(phone_number);
    }
    this.setState({open: false});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div >
        <FlatButton label="Add contact" onClick={this.handleOpen} />
        <Dialog
          title="Here you can add a canadian telephone number to chat about crime with. EX: +17787070030"
          bodyStyle={{leftMargin:"50%"}}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <form action="" onSubmit={(e) => { e.preventDefault(); this.handleCloseSubmit(e)} }  >
          <TextField id="phone_number" underlineFocusStyle={{borderColor: "grey500"}}/>
          <FlatButton label="submit" type='submit'/>
        </form>
        </Dialog>
      </div>
    );
  }
}
