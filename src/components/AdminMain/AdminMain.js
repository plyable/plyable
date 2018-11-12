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
        console.log(this.props.reduxState.adminMainReducer);

    }

    handleAddNewOrganizationClick = () => {
        console.log('handleAddNewOrganizationClick working');
    }
    handleViewOrgClick = () => {
        this.props.history.push()
        console.log('handleViewOrgClick working');
    }
    handleDeactivateClick = () => {
        console.log('handleDeactivateClick working');
    }
    render() {
        return (
            <div>
                <h1>Organization List</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Organization</th>
                            <th>View/Edit</th>
                            <th>Deactivate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.adminMainReducer.map(organization => {
                            return <tr key={organization.id} organization={organization}>
                                <td>{organization.name}</td>
                                <td><button onClick={this.handleViewOrgClick}>View/Edit</button></td>
                                <td><button onClick={this.handleDeactivateClick}>Deactivate</button></td>
                            </tr>
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

export default connect(mapStateToProps)(AdminMain);

