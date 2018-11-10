// Eli will make this 1 card with props 
import React, {Component} from 'react';
import {connect} from 'react-redux';


class NextButton extends Component {

    handleClick = () => {
        this.props.switchCard(this.props.number);
    }

  render() {
    return (
        <button onClick={this.handleClick}>Next</button>
  )}
}

export default connect()(NextButton);
