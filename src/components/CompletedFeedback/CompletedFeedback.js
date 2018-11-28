import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { TablePagination, List, ListItem, Paper } from '@material-ui/core';

const styles = () => ({
    feedbackList: {
        width: '350px',
        margin: '25px',
    },
    innerPaper: {
        padding: '10px',
    },
});

class CompletedFeedback extends Component {
    state = {
        rowsPerPage: 6,
        page: 0,
    }

    componentDidMount() {
        const arr = window.location.hash.split('/');
        let id;
        if (this.props.useOrgId) {
            id = this.props.reduxState.user.org_id
        } else {
            id = this.props.id || arr[arr.length - 1] === '' ? arr[arr.length - 2] : arr[arr.length - 1];
        }
        this.props.dispatch({ type: 'FETCH_PARTICIPATION', payload: id });
    }

    //pagination
    handleChangeRowsPerPage = event => {
        this.setState({
            ...this.state,
            rowsPerPage: event.target.value
        });
    }
    //pagination
    handleChangePage = (event, page) => {
        this.setState({
            ...this.state,
            page,
        });
    }

    render() {
        const { rowsPerPage, page } = this.state;
        let employees = this.props.reduxState.participationReducer;
        let uncompleted = employees.filter(employee => Number(employee.count) === 0);
        const { classes } = this.props;
        return (
            <div>
                {/*Iterates through total employees in organization, checks those who have completed their surveys and subtracts it from the total*/}
                <h4>{employees.length - uncompleted.length}/{employees.length} {this.props.reduxState.adminMainReducer.name} employees have completed their survey</h4>
                {uncompleted.length > 0 &&
                    <div className={classes.feedbackList}>
                        <Paper>
                            <div className={classes.innerPaper}>
                                <br />
                                <h3>Awaiting Response From...</h3>
                                <List>
                                    {uncompleted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(employee => <ListItem key={employee.email}>{employee.email}</ListItem>)}
                                </List>
                            </div>
                        </Paper>
                        <TablePagination
                            rowsPerPageOptions={[6, 12, 24]}
                            component="div"
                            count={uncompleted.length}
                            labelRowsPerPage="Emails per page"
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
                    </div>}
            </div >
        );
    }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(CompletedFeedback));