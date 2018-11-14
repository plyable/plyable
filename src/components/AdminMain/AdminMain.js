import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AdminMain extends Component {
    // state = {
    //     email: '',
    //     password: '',
    // };

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ORGANIZATIONS', payload: this.props.reduxState.adminMainReducer })
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

    handleAddManagers = () => {
        console.log('add managers working');
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
                                <td><button onClick={this.handleAddManagers}>Add Managers</button></td>
                            </tr> //this for each loop will map through available organizations in the database and display them 
                            //on the DOM in a table
                        })}
                    </tbody>
                </table>
                < button onClick={this.handleAddNewOrganizationClick}>Add New Organization</button>
            </div >
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

const adminMainRouter = withRouter(AdminMain);

export default connect(mapStateToProps)(adminMainRouter);

