import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class CompletedFeedback extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PARTICIPATION', payload: this.props.id });
    }


    render() {
        let employees = this.props.reduxState.participationReducer;
        let uncompleted = employees.filter(employee => employee.count == 0);
        return (
            <div>
                <h4>{employees.length - uncompleted.length}/{employees.length} {this.props.reduxState.adminMainReducer.name} employees have completed their survey</h4>
                <h3>Awaiting Response From...</h3>
                <ul>
                    {uncompleted.map(employee => <li key={employee.email}>{employee.email}</li>)}
                </ul>
            </div >
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});


export default connect(mapStateToProps)(CompletedFeedback);

