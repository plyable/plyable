// Eli will make this 1 card with props 
import React, {Component} from 'react';
import {connect} from 'react-redux';


class NextButton extends Component {

    handleClick = () => {
        this.props.handleSubmit();
        //handleSubmit changes redux state, and changes the local state of BehaviorCard
        this.props.switchCard(this.props.number);
        //swichCard changes the local state of Survey.
    }

  render() {
    return (
        <button onClick={this.handleClick}>Next</button>
  )}
}

export default connect()(NextButton);
