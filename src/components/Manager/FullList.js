import React, { Component } from 'react';
import { connect } from 'react-redux';

class FullList extends Component {

    state = {
        oldEmail: '',
        newEmail: '',
        editBox: false,
    }

    componentDidMount() {
        const id = this.props.reduxState.user.org_id
        this.props.dispatch({ type: 'FETCH_PARTICIPATION', payload: id });
    }

    handleClick = (email) => {
        console.log(email);
        this.props.dispatch({ type: 'REINVITE', payload: email });
    }

    handleChange = event => {
        this.setState({
            ...this.state,
            newEmail: event.target.value
        });
    }

    handleCancel = () => {
        this.setState({
            oldEmail: '',
            newEmail: '',
            editBox: false,
        });
    }

    handleEdit = employee => event => {
        this.setState({
            ...this.state,
            oldEmail: employee.email,
            editBox: true,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'EDIT_EMPLOYEE', payload: { ...this.state, org_id: this.props.reduxState.user.org_id } });
        this.handleCancel();
    }

    render() {
        let employees = this.props.reduxState.participationReducer;
        return (
            <div>
                <h4>{employees.length} registered {employees.length > 1 ? 'employees' : 'employee'}:</h4>
                <ul>
                    {employees.map(employee => <li key={employee.email}>{employee.email + ' '}
                        <button onClick={() => this.handleClick(employee.email)}>resend invite</button>
                        <button onClick={this.handleEdit(employee)}>edit</button>
                    </li>)}
                </ul>
                <dialog open={this.state.editBox}>
                    <p>enter new email</p>
                    <form onSubmit={this.handleSubmit} >
                        <input type="email" onChange={this.handleChange} value={this.state.newEmail} />
                        <input type="submit" value="send" />
                    </form>
                    <button onClick={this.handleCancel}>cancel</button>
                </dialog>
            </div >
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});


export default connect(mapStateToProps)(FullList);

