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
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
    root: {
        margin: '0 1px',
    },
    card: {
        maxWidth: '700px',
        margin: '0 auto',
        borderRadius: '18px',
    },
    value: {
        fontSize: '20px',
        margin: '15px 0',
        textAlign: 'left',
    },
    subTitle: {
        marginLeft: '10px',
        marginTop: '10px',
    },
    formDiv: {
        textAlign: 'center',
        marginBottom: '15px',
    },
    formControl: {
        width: '100%',
    },
    radioLabel: {
        margin: '0',
        width: '25%',
    },
    grow: {
        flexGrow: 1,
    },
}); //material ui styles

class BehaviorCard extends Component {
    state = {
        score: null,
        expectationScore: null,
    }

    //handleChange takes in a integer 0 through 3 and returns an anonymous callback
    //function that sets the local state to that integer when called
    handleChange = property => event => {
        this.setState({ [property]: event.target.value });
    }

    //this function runs whenever the client clicks the next or prev button, and updates redux state
    handleSubmit = () => {
        this.props.dispatch({
            type: 'SET_SCORE',
            payload: {
                id: this.props.card.id,
                value: this.props.card.value,
                score: this.state.score,
                expectScore: this.state.expectationScore,
            }
        });
        this.setState({ score: null, expectationScore: null });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography gutterBottom className={classes.value} variant="h4" component="h2">
                            How often do you experience or observe <b>{this.props.card.value}</b>?
                        </Typography>
                        <Typography component="p">
                            <u>{this.props.card.value}</u> : {this.props.card.definition}
                        </Typography>
                        <Typography className={classes.subTitle} component="p">
                            &gt; How often do you observe this behavior?
                        </Typography>
                        <div className={classes.formDiv}>
                            <FormControl className={classes.formControl}>
                                <RadioGroup
                                    aria-label="Behavior"
                                    name="behavior"
                                    value={this.state.score}
                                    onChange={this.handleChange('score')}
                                    row
                                >
                                    <FormControlLabel className={classes.radioLabel} value="0" control={<Radio color="primary" />} labelPlacement="bottom" label="Rarely" />
                                    <FormControlLabel className={classes.radioLabel} value="1" control={<Radio color="primary" />} labelPlacement="bottom" label="Sometimes" />
                                    <FormControlLabel className={classes.radioLabel} value="2" control={<Radio color="primary" />} labelPlacement="bottom" label="Weekly" />
                                    <FormControlLabel className={classes.radioLabel} value="3" control={<Radio color="primary" />} labelPlacement="bottom" label="Consistently" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Typography className={classes.subTitle} component="p">
                            &gt; How often would you expect to observe this behavior?
                        </Typography>
                        <div className={classes.formDiv}>
                            <FormControl className={classes.formControl}>
                                <RadioGroup
                                    aria-label="Expection Behavior"
                                    name="expectationBehavior"
                                    value={this.state.expectationScore}
                                    onChange={this.handleChange('expectationScore')}
                                    row
                                >
                                    <FormControlLabel className={classes.radioLabel} value="0" control={<Radio color="primary" />} labelPlacement="bottom" label="Rarely" />
                                    <FormControlLabel className={classes.radioLabel} value="1" control={<Radio color="primary" />} labelPlacement="bottom" label="Sometimes" />
                                    <FormControlLabel className={classes.radioLabel} value="2" control={<Radio color="primary" />} labelPlacement="bottom" label="Weekly" />
                                    <FormControlLabel className={classes.radioLabel} value="3" control={<Radio color="primary" />} labelPlacement="bottom" label="Consistently" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </CardContent>
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
                                disabled={this.state.score !== null && this.state.expectationScore !== null ? false : true}
                            /> :
                            <SubmitButton
                                lastCard={this.props.card}
                                score={this.state.score}
                                expectationScore={this.state.expectationScore}
                                disabled={this.state.score !== null && this.state.expectationScore !== null ? false : true}

                            />
                        }
                    </CardActions>
                </Card>
            </div>
        )
    }
}

BehaviorCard.propTypes = { classes: PropTypes.object.isRequired };
const mapStateToProps = ({ survey }) => ({ survey: survey.surveyScore });
const behaviorCardStyles = withStyles(styles)(BehaviorCard);

export default connect(mapStateToProps)(behaviorCardStyles);