// Eli will make this 1 card with props 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NextButton from './NextButton';
import PrevButton from './PrevButton';


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

    //this function runs whenever the client clicks the next or prev button, and updates redux state
    handleSubmit = () => {
        this.props.dispatch({ type: 'SET_SCORE', payload: { value: this.props.card.value, score: this.state.score } });
        this.setState({
            score: null,
        })
    }

    render() {
        return (
            <div>
                <h3>{this.props.card.value}</h3>
                <p>Definition: {this.props.card.definition}</p>
                <p>Context: {this.props.card.context}</p>
                {/* These are vanilla radio buttons. On check, the local state will change to toggle one of
        those values as being on */}
                {this.props.current > 0 && <PrevButton
                    number={this.props.current - 1}
                    switchCard={this.props.switchCard}
                    handleSubmit={this.handleSubmit}
                />}
                <input type="checkbox" onChange={this.handleChange(0)} checked={this.state.score === 0} />
                <input type="checkbox" onChange={this.handleChange(1)} checked={this.state.score === 1} />
                <input type="checkbox" onChange={this.handleChange(2)} checked={this.state.score === 2} />
                <input type="checkbox" onChange={this.handleChange(3)} checked={this.state.score === 3} />
                {this.state.score !== null && <NextButton
                    number={this.props.current + 1}
                    switchCard={this.props.switchCard}
                    handleSubmit={this.handleSubmit}
                />
            }
            </div>
        )
    }
}

export default connect()(BehaviorCard);
