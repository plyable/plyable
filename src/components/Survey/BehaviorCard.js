import React, { Component } from 'react';
import { connect } from 'react-redux';
import NextButton from './NextButton';
import PrevButton from './PrevButton';
import SubmitButton from './SubmitButton';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        margin: '0 5px',
    },
    group: {
        verticalAlign: 'center',
        textAlign: 'center',
    },
    card: {
        maxWidth: 700,
        margin: '0 auto',
        textAlign: 'center',
    },
    center: {
        textAlign: 'center',
    },
    value: {
        color: "rgb(82, 132, 196, 1)",
        textAlign: 'center',
        font: 'Calibri',
    },
    grow: {
        flexGrow: 1,
    },
    progress: {
        textAlign: 'left',
        margin: '0',
    },
});//material ui styles

class BehaviorCard extends Component {
    state = {
        score: null
    }

    //handleChange takes in a integer 0 through 3 and returns an anonymous callback
    //function that sets the local state to that integer when called
    handleChange = event => {
        this.setState({ score: event.target.value });
    }

    //this function runs whenever the client clicks the next or prev button, and updates redux state
    handleSubmit = () => {
        this.props.dispatch({
            type: 'SET_SCORE',
            payload: {
                id: this.props.card.id,
                value: this.props.card.value,
                score: this.state.score
            }
        });
        this.setState({ score: null });
    }

    componentWillReceiveProps = newProps => {
        this.setState({
            score: this.props.survey[newProps.card.value],
        });
    }
    //the above lifecycle method makes it so that when the state of survey is changed
    //the behavior card shown will automatically show the score saved to their response
    //if they have already answered this query

    componentDidMount = () => {
        this.setState({ score: this.props.survey[this.props.card.value] });
    }
    //the mount lifecycle method does the same as the previous lifecycle method for the
    //cases of refresh and the final back button at the end of the survey

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardContent className={classes.center}>
                            <Typography className={classes.progress}>
                                {this.props.cardNumber + 1} of 6
                            </Typography>
                            <Typography gutterBottom className={classes.value} variant="h4" component="h2">
                                <b>{this.props.card.value}</b>
                            </Typography>
                            <Typography component="p">
                                <b>Definition</b> : {this.props.card.definition}
                            </Typography>
                            <Typography component="p">
                                <b>Context</b> : {this.props.card.context}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <div style={{ textAlign: 'center' }}>
                        <FormControl>
                            <RadioGroup
                                aria-label="Behavior"
                                name="behavior"
                                className={classes.group}
                                value={this.state.score}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="rarely" />
                                <FormControlLabel value="1" control={<Radio />} label="occasionally" />
                                <FormControlLabel value="2" control={<Radio />} label="every week" />
                                <FormControlLabel value="3" control={<Radio />} label="every day" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <CardActions>
                        <PrevButton
                            number={this.props.current - 1}
                            switchCard={this.props.switchCard}
                            disabled={this.props.current > 0 ? false : true}
                        />
                        <div className={classes.grow} />
                        {this.props.cardNumber + 1 < 6 ?
                            <NextButton
                                number={this.props.current + 1}
                                switchCard={this.props.switchCard}
                                handleSubmit={this.handleSubmit}
                                disabled={this.state.score !== undefined ? false : true}
                            /> :
                            <SubmitButton
                                disabled={this.state.score !== undefined ? false : true}
                            />
                        }
                    </CardActions>
                </Card>
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


