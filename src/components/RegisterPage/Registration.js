import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function stringToParams(string) {
    let objectToSend = {};
    let paramArray;
    string.replace('?', '').split('&')
        .forEach(param => {
            paramArray = param.split('=');
            if (paramArray.length > 1) {
                objectToSend[paramArray[0]] = paramArray[1];
            }
        });
    return objectToSend;
}

class RegisterPage extends Component {
    state = {
        email: stringToParams(this.props.location.search).email,
        password: '',
        confirmPassword: '',
    };

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            this.props.dispatch({ type: 'REGISTER_INVITED', payload: { password: this.state.password, ...stringToParams(this.props.location.search) } });
        } else {
            console.log('your password doesn\'t match');
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email
                        <input type="email" onChange={this.handleInputChangeFor('email')} value={this.state.email} required />
                    </label>
                    <br />
                    <label>Password
                        <input type="password" onChange={this.handleInputChangeFor('password')} value={this.state.password} required />
                    </label>
                    <br />
                    <label>Confirm Password
                        <input type="password" onChange={this.handleInputChangeFor('confirmPassword')} value={this.state.confirmPassword} required />
                    </label>
                    <br />
                    <input type="submit" />
                </form>

            </div>
        );
    }
}


const mapStateToProps = state => ({
    mode: state.registerModeReducer
});

export default connect(mapStateToProps)(withRouter(RegisterPage));

