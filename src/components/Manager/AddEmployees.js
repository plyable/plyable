// Add Employees input box

import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddEmployees extends Component {
  state = {
    // TO DO: make the variable naming clearer
    emailList: []
  }

  // Button Click
  sendInvitationEmails = async () => {
    console.log('emailList BEFORE:', this.state.emailList);
    // creates comma separate array
    let splitList = this.state.emailList.split('\n');
    
    // Adds Employee Emails to the DB
    await this.props.dispatch({ type: 'ADD_EMPLOYEES', payload: splitList })

  }

  // Collect the data entered into the box
  handleChange = (event) => {
    this.setState({ emailList: event.target.value })
  }

  render() {

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

const mapStateToProps = (reduxState) => {
  return { reduxState };
}

export default connect(mapStateToProps)(AddEmployees);