import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminMain extends Component {
    // state = {
    //     email: '',
    //     password: '',
    // };

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ORGANIZATIONS', payload: this.props.reduxState.adminMainReducer })
        console.log(this.props.reduxState.adminMainReducer);

    }

    handleClick = () => {
        console.log('button working');
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
                                <td><button>View/Edit</button></td>
                                <td><button>Deactivate</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>



                < button onClick={this.handleClick}>Add New Organization</button>

            </div >
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(AdminMain);

