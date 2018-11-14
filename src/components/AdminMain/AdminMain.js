import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AdminMain extends Component {
    state = {
        emailList: '',
        organization: 0,
    };

    componentDidMount() {
        if(this.props.reduxState.user.security_level!==0){
            this.props.history.push('/main');
        } else {
            this.props.dispatch({ type: 'FETCH_ORGANIZATIONS', payload: this.props.reduxState.adminMainReducer })
        }
    };//this will fetch all organizations from the database upon page load

    handleAddNewOrganizationClick = () => {
        this.props.history.push('/adminmain/createneworganization');
    }; //this button will take the admin to a form to add a new organization

    handleViewOrgClick = (id) => {
        this.props.history.push(`/adminmain/organization/${id}`);
    }//this button will take the admin to an organization-specific admin page

    handleDeactivateClick = () => {
        console.log('handleDeactivateClick working');
    }//this button will deactivate the organization, thereby quitting the collection of data, but the data will still be viewable

    handleAddManagers = id => () => {
        this.setState({
            ...this.state,
            organization: id,
        });
    }

    handleCancel = () => {
        this.setState({
            emailList: '',
            organization: 0,
        });
    }

    sendInvitationEmails = () => {
        let splitList = this.state.emailList.split('\n'); // creates comma separate array  
        this.props.dispatch({ type: 'ADD_EMPLOYEES', payload: {...this.state, emailList: splitList} });
        this.handleCancel();
    }

    handleChange = event => {
        this.setState({
            ...this.state,
            emailList: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <h1>Organization List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Organization Name</th>
                            <th>Survey Results Page</th>
                            <th>Deactivate</th>
                            <th>Add Managers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.adminMainReducer.map(organization => {
                            return <tr key={organization.id} organization={organization}>
                                <td>{organization.name}</td>
                                <td><button onClick={() => this.handleViewOrgClick(organization.id)}>View</button></td>
                                <td><button onClick={this.handleDeactivateClick}>Deactivate</button></td>
                                <td><button onClick={this.handleAddManagers(organization.id)}>Add Managers</button></td>
                            </tr> //this for each loop will map through available organizations in the database and display them 
                            //on the DOM in a table
                        })}
                    </tbody>
                </table>
                < button onClick={this.handleAddNewOrganizationClick}>Add New Organization</button>
                <dialog open={this.state.organization > 0}>
                <h2>Add Employees</h2>
        <h3>1 email per line</h3>
        {/* Large Input Box */}
        <textarea
          value={this.state.emailList}
          onChange={this.handleChange}
          placeholder='No Commas'
        >
        </textarea>
        <button onClick={this.sendInvitationEmails}>Send Invitations</button>

                    <button onClick={this.handleCancel}>Cancel</button>
                </dialog>
            </div >
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

const adminMainRouter = withRouter(AdminMain);

export default connect(mapStateToProps)(adminMainRouter);

