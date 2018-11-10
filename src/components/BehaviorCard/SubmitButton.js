// Eli will make this 1 card with props 
import React, {Component} from 'react';
import {connect} from 'react-redux';


class SubmitButton extends Component {

    handleClick = () => {
        this.props.dispatch({ type: 'SEND_SURVEY_RESULTS', payload: this.props.data });
    }

  render() {
    return (
        <button onClick={this.handleClick}>Finish Survey</button>
  )}
}

export default connect()(SubmitButton);
