// Eli will make this 1 card with props 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class SubmitButton extends Component {

    handleClick = () => {
        this.props.dispatch({ type: 'SEND_SURVEY_RESULTS', payload: this.props.survey });
        //this sends the survey results, as stored in redux state to a saga and
        //eventually to the server
        this.props.dispatch({ type: 'SURVEY_COMPLETED_SNACKBAR' })//this will dispatch an action type which triggers a SnackBar alert

    }

    render() {
        return (
            <Button 
                size="small" 
                color="primary" 
                onClick={this.handleClick}
                disabled={this.props.disabled}
            >
                Finish Survey
            </Button>
        )
    }
}

const mapStateToProps = ({ survey }) => ({ survey: survey.surveyScore });

export default connect(mapStateToProps)(withRouter(SubmitButton));
