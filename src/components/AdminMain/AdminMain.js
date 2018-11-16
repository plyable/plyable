import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import securityLevel from '../../constants/securityLevel';

class AdminMain extends Component {
    state = {
        emailList: '',
        org_id: 0,
        deactivateDialog: false,
        addManager: false
    };

    componentDidMount() {
        if (this.props.reduxState.user.security_level !== securityLevel.ADMIN_ROLE) {
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

    //this button will deactivate the organization, thereby stop the collection of data, but the data will still be viewable
    handleDeactivateClick = (org_id) => {
        console.log('deactivate clicked - organization id:', org_id);
        this.setState({deactivateDialog: true, org_id: org_id}) // open dialog box
    }
    
    handleDeactivateConfirm = (org_id) => {
        this.props.dispatch({ type: 'DEACTIVATE_ORGANIZATION', payload: org_id });
        this.setState({...this.state, deactivateDialog: false})
    }

    handleCancelDeactivate = () => {
        this.setState({...this.state, deactivateDialog: false})
    }

    handleAddManagers = id => () => {
        this.setState({
            ...this.state,
            org_id: id,
            addManager: true
        });
    }

    handleCancelAddManager = () => {
        this.setState({
            ...this.state,
            emailList: '',
            org_id: 0,
            addManager: false
        });
    }

    sendInvitationEmails = () => {
        let splitList = this.state.emailList.split('\n'); // creates comma separate array  
        this.props.dispatch({ type: 'ADD_EMPLOYEES', payload: { ...this.state, emailList: splitList } });
        this.handleCancelAddManager();
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
                                {/* Ternary Function to render button or text */}
                                <td> {organization.collecting_data ? <button onClick={() => this.handleDeactivateClick(organization.id)}>Deactivate</button> : <p>Deactivated</p>}</td>
                                {/* Ternary Function to disable   */}
                                <td>
                                    <button onClick={this.handleAddManagers(organization.id)} disabled={!organization.collecting_data}>Add Managers</button></td>
                            </tr> //this for each loop will map through available organizations in the database and display them 
                            //on the DOM in a table
                        })}
                    </tbody>
                </table>
                < button onClick={this.handleAddNewOrganizationClick}>Add New Organization</button>
                
                {/* Dialog box for deactivating */}
                <dialog open={this.state.deactivateDialog}>
                        <h2>Are you sure you want to deactivate this company?</h2>
                        <button onClick={() => this.handleDeactivateConfirm(this.state.org_id)}>Yes</button>
                        <button onClick={this.handleCancelDeactivate}>No</button>
                </dialog>

                {/* Dialog box for inviting managers */}
                <dialog open={this.state.addManager}>
                    <h2>Add Managers</h2>
                    <h3>1 email per line</h3>
                    {/* Large Input Box */}
                    <textarea
                        value={this.state.emailList}
                        onChange={this.handleChange}
                        placeholder='No Commas'
                    >
                    </textarea>
                    <button onClick={this.sendInvitationEmails}>Send Invitations</button>

                    <button onClick={this.handleCancelAddManager}>Cancel</button>
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

