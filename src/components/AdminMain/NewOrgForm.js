import React, { Component } from 'react';
import { connect } from 'react-redux';


class NewOrgForm extends Component {
    state = {
        newOrganization: {
            name: '',
        }
    };//this is the local state for creating new organizations

    handleChangeFor = propertyName => event => {
        console.log('event logging');
        this.setState({
            newOrganization: {
                ...this.state.newOrganization,
                [propertyName]: event.target.value
            }
        });
    };//currying function that can handle many inputs--currently only handling newOrganization.name

    handleOrgSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_NEW_ORGANIZATION', payload: this.state.newOrganization }) //upon submit, action sends info to newOrgSaga
        this.setState({
            ...this.state.newOrganization,
            newOrganization: {
                name: '',
                // managerName: '',
                // managerEmail: '',
            }
        });//spread operator holds former state, setState alters state to make a new organization
        this.props.dispatch({ type: 'ADD_NEW_ORGANIZATION_SNACKBAR' })//this will dispatch an action type which triggers a SnackBar alert
    };//end handleOrgSubmit

    render() {
        return (
            <div>
                <h1>Add a New Organization</h1>
                <form onSubmit={this.handleOrgSubmit}>
                    <input type='text' value={this.state.newOrganization.name} placeholder="New Organization" onChange={this.handleChangeFor('name')} />
                    <input type='submit' value='Submit' />
                </form>
            </div >
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(NewOrgForm);

