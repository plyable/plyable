//this component holds all the behavior cards.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BehaviorCard from './BehaviorCard';
import SubmitButton from './SubmitButton';

class Survey extends Component {

    state = {
        openCard: 0,//this determines which of the cards is being rendered
    }

    componentDidMount() {
        //on mount, fetch data reguarding this weeks survey
        this.props.dispatch({ type: 'FETCH_BEHAVIORS' });
    }

    switchCard = number => {
        this.setState({
            openCard: number,
        });
    }

    handleBack = () => {
        this.setState({ openCard: this.state.openCard - 1 });
    }

    render() {
        let cards = this.props.state.behaviorReducer.behaviors;
        return (
            <div>
                {this.state.openCard < 6 && <h5>{this.state.openCard + 1} of 6</h5>}
                <h1>Survey</h1>
                {cards && this.state.openCard < 6 ? <BehaviorCard
                    card={cards[this.state.openCard] || {value: 'Loading'}}
                    current={this.state.openCard}
                    switchCard={this.switchCard}
                />
                    : <div>
                        <button onClick={this.handleBack}>Back</button>
                        <SubmitButton />
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(Survey);
