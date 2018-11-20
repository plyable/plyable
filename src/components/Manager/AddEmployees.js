import React, { Component } from 'react';
import { connect } from 'react-redux';
import securityLevel from '../../constants/securityLevel';
import FullList from './FullList';
import { Button, withStyles } from '@material-ui/core';

const styles = () => ({
  buttons: {
    background: 'linear-gradient(45deg, #a640fb 40%, #aaa 90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 24,
    padding: '0 10px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 185, .3)',
  },
})
class AddEmployees extends Component {
  state = {
    emailList: []
  }

  // Button Click
  sendInvitationEmails = async () => {

    // If box has content, send
    if (this.state.emailList.length > 0) {
      let splitList = this.state.emailList.split('\n'); // creates comma separate array  

      await this.props.dispatch({ type: 'ADD_EMPLOYEES', payload: { emailList: splitList } });  // Adds Employee Emails to the DB

      // TO DO: alert success only if email sent

    } else { // alert that content is needed
      alert('Please add emails. 1 Per line. No Commas.');
    }

  }

  // Collect the data entered into the box
  handleChange = (event) => {
    this.setState({ emailList: event.target.value })
  }

  componentDidMount = () => {
    if (this.props.reduxState.user.security_level === securityLevel.EMPLOYEE_ROLE) {
      this.props.history.push('/main');
    }
  }

  render() {
    const { classes } = this.props;
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
        <Button onClick={this.sendInvitationEmails}
          classes={{
            root: classes.buttons,
          }}>Send Invitations</Button>
        <FullList />

      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return { reduxState };
}

export default connect(mapStateToProps)(withStyles(styles)(AddEmployees));