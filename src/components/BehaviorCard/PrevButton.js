// Eli will make this 1 card with props 
import React, {Component} from 'react';
import {connect} from 'react-redux';


class PrevButton extends Component {

    handleClick = () => {
        this.props.switchCard(this.props.number);
    }

  render() {
    return (
        <button onClick={this.handleClick}>Previous</button>
  )}
}

export default connect()(PrevButton);
