// Eli will make this 1 card with props 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SubmitButton extends Component {

    handleClick = () => {
        this.props.dispatch({ type: 'SEND_SURVEY_RESULTS', payload: this.props.survey });
        //this sends the survey results, as stored in redux state to a saga and
        //eventually to the server
    }

    render() {
        return (
            <button onClick={this.handleClick}>Finish Survey</button>
        )
    }
}

const mapStateToProps = ({ user, survey }) => ({ user, survey: survey.surveyScore });

export default connect(mapStateToProps)(withRouter(SubmitButton));
