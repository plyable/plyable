import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminMain extends Component {
    state = {
        email: '',
        password: '',
    };

    handleClick = () => {
        console.log('button working');
    }
    render() {
        return (
            <div>
                <h1>Organization List</h1>


                <button onClick={this.handleClick}>Add New Organization</button>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(AdminMain);

