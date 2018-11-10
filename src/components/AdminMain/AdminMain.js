import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminMain extends Component {
    state = {
        email: '',
        password: '',
    };


    render() {
        return (
            <div>
                <h1>Organization List</h1>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(AdminMain);

