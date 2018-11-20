import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TablePagination } from '@material-ui/core';

class CompletedFeedback extends Component {

    state = {
        rowsPerPage: 6,
        page: 0,
    }

    componentDidMount() {
        const arr = window.location.hash.split('/');
        let id;
        if(this.props.useOrgId){
            id = this.props.reduxState.user.org_id
        } else {
            id = this.props.id || arr[arr.length - 1] === '' ? arr[arr.length - 2] : arr[arr.length - 1];
        }
        this.props.dispatch({ type: 'FETCH_PARTICIPATION', payload: id });
    }

    handleChangeRowsPerPage = event => {
        this.setState({
            ...this.state,
            rowsPerPage: event.target.value
        });
    };
    handleChangePage = (event, page) => {
        this.setState({
            ...this.state,
            page,
        });
    };


    render() {
        const { rowsPerPage, page } = this.state;
        let employees = this.props.reduxState.participationReducer;
        let uncompleted = employees.filter(employee => Number(employee.count) === 0);
        return (
            <div>
                <h4>{employees.length - uncompleted.length}/{employees.length} {this.props.reduxState.adminMainReducer.name} employees have completed their survey</h4>
                <h3>Awaiting Response From...</h3>
                <ul>
                    {uncompleted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(employee => <li key={employee.email}>{employee.email}</li>)}
                </ul>
                <TablePagination
                    rowsPerPageOptions={[6, 12, 24]}
                    component="div"
                    count={uncompleted.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div >
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});


export default connect(mapStateToProps)(CompletedFeedback);

