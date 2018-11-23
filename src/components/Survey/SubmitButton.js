import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class SubmitButton extends Component {

    handleClick = () => {
        this.props.dispatch({ 
            type: 'SEND_SURVEY_RESULTS', 
            payload: { 
                survey: [
                    ...this.props.survey,
                    {
                        id: this.props.lastCard.id,
                        score: this.props.score,
                        expectScore: this.props.expectationScore,
                        value: this.props.lastCard.value
                    }
                ]
            } 
        });
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

const mapStateToProps = ({ survey }) => ({ 
    survey: survey.surveyScore, 
    expectationSurvey: survey.expectationScore  
});

export default connect(mapStateToProps)(withRouter(SubmitButton));
