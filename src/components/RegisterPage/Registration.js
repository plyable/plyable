import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class RegisterPage extends Component {
    state = {
        email: '',
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
        if(this.state.password === this.state.confirmPassword) {
            console.log(this.state);
        } else {
            console.log('your password doesn\'t match');
        }
    }

    componentDidMount(){
        console.log(this.props.match.params);
        this.props.dispatch({ type: 'FETCH_NEW_USER', payload: this.props.match.params });
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

});

export default connect(mapStateToProps)(withRouter(RegisterPage));

