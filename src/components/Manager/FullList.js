import React, { Component } from 'react';
import { connect } from 'react-redux';

class FullList extends Component {

    componentDidMount() {
        const id = this.props.reduxState.user.org_id
        this.props.dispatch({ type: 'FETCH_PARTICIPATION', payload: id });
    }

    handleClick = (email) => {
        console.log(email);
        this.props.dispatch({ type: 'REINVITE', payload: email });
    }

    render() {
        let employees = this.props.reduxState.participationReducer;
        return (
            <div>
                <h4>{employees.length} registered {employees.length > 1 ? 'employees' : 'employee'}:</h4>
                <ul>
                    {employees.map(employee => <li key={employee.email}>{employee.email + ' '}
                        <button onClick={() => this.handleClick(employee.email)}>resend invite</button>
                    </li>)}
                </ul>
            </div >
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});


export default connect(mapStateToProps)(FullList);

