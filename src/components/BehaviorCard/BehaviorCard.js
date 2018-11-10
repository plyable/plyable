// Eli will make this 1 card with props 
import React, {Component} from 'react';
import {connect} from 'react-redux';


class BehaviorCard extends Component {

    state = {
        score: null
    }

    //handleChange takes in a integer 0 through 3 and returns an anonymous callback
    //function that sets the local state to that integer when called
    handleChange = newScore => event => {
        this.setState({
            score: newScore,
        });
    }

  render() {
    return (
      <div>
          <h3>{this.props.card.value}</h3>
        <p>Definition: {this.props.card.definition}</p>
        <p>Context: {this.props.card.context}</p>
        {/* These are vanilla radio buttons. On check, the local state will change to toggle one of
        those values as being on */}
        <input type="checkbox" onChange={this.handleChange(0)} checked={this.state.score===0} />
        <input type="checkbox" onChange={this.handleChange(1)} checked={this.state.score===1} />
        <input type="checkbox" onChange={this.handleChange(2)} checked={this.state.score===2} />
        <input type="checkbox" onChange={this.handleChange(3)} checked={this.state.score===3} />
      </div>
  )}
}

export default connect()(BehaviorCard);
