// Eli will make this 1 card with props 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NextButton from './NextButton';
import PrevButton from './PrevButton';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        // display: 'inline',
        verticalAlign: 'top',
        textAlign: 'center',
    },
});//material ui styles

class BehaviorCard extends Component {

    state = {
        score: null
    }

    //handleChange takes in a integer 0 through 3 and returns an anonymous callback
    //function that sets the local state to that integer when called
    handleChange = event => {
        this.setState({
            score: event.target.value,
        });
    }

    //this function runs whenever the client clicks the next or prev button, and updates redux state
    handleSubmit = () => {
        this.props.dispatch({ type: 'SET_SCORE', payload: { id: this.props.card.id, value: this.props.card.value, score: this.state.score } });
        this.setState({
            score: null,
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            score: this.props.survey[newProps.card.value],
        });
    }
    //the above lifecycle method makes it so that when the state of survey is changed
    //the behavior card shown will automatically show the score saved to their response
    //if they have already answered this query

    componentDidMount() {
        this.setState({
            score: this.props.survey[this.props.card.value],
        });
    }
    //the mount lifecycle method does the same as the previous lifecycle method for the
    //cases of refresh and the final back button at the end of the survey

    render() {
        const { classes } = this.props;
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
                {/* FormControl brought in from Material UI to style radio buttons*/}
                <FormControl className={classes.formControl}>
                    <RadioGroup
                        aria-label="Behavior"
                        name="behavior"
                        className={classes.group}
                        value={this.state.score}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="0" control={<Radio />} label="rarely" labelPlacement="end" />
                        <FormControlLabel value="1" control={<Radio />} label="occasionally" labelPlacement="end" />
                        <FormControlLabel value="2" control={<Radio />} label="every week" labelPlacement="end" />
                        <FormControlLabel value="3" control={<Radio />} label="every day" labelPlacement="end" />
                        {this.state.score !== undefined && <NextButton
                            number={this.props.current + 1}
                            switchCard={this.props.switchCard}
                            handleSubmit={this.handleSubmit}
                        />
                        }
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }
}

BehaviorCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const behaviorCardStyles = withStyles(styles)(BehaviorCard);

const mapStateToProps = ({ survey }) => ({ survey: survey.surveyScore });

export default connect(mapStateToProps)(behaviorCardStyles);


