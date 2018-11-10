// Add Employees input box

import React, { Component } from 'react';

class AddEmployees extends Component {
  state = {
    emailList: []
  }

  sendInvitationEmails = () => {
    console.log('emailList BEFORE:', this.state.emailList);
    let splitList = this.state.emailList.split('\n');
    this.setState({emailList: splitList});
  }

  handleChange = (event) => {
    this.setState({ emailList: event.target.value })
  }
  
  render() {
    // TEST email list splitting working
    console.log('emailList state AFTER:', this.state.emailList);
    return (
      <div>
        <h2>Add Employees</h2>
        <h3>1 email per line</h3>
        {/* Large Input Box */}
        <textarea 
          value={this.state.emailList} 
          onChange={this.handleChange}
          placeholder='No Commas'
        >
        </textarea>

        {/* OnClick rather than submit, to allow enter for new line */}
        <button onClick={this.sendInvitationEmails}>Send Invitations</button>

      </div>
    );
  }
}

export default AddEmployees;