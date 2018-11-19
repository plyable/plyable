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

const styles = theme => ({
    root: {
        margin: '0 5px',
        font: 'Calibri',
    },
    card: {
      maxWidth: 700,
    },
    value: {
        fontSize: '20px',
        margin: '15px 0',
        textAlign: 'left',
    },
    radioGroup: {
        textAlign: 'center',
        marginBottom: '15px',
    },
    grow: {
      flexGrow: 1,
    },
    progress: {
        textAlign: 'left',
        margin: '0',
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
                score: this.state.score 
            } 
        });
        this.props.dispatch({ 
            type: 'SET_EXPECTATION_SCORE', 
            payload: { 
                id: this.props.card.id, 
                value: this.props.card.value, 
                score: this.state.expectationScore 
            } 
        });
        this.setState({ score: null });
        this.setState({ expectationScore: null });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.progress}>
                            {this.props.cardNumber + 1} of 6
                        </Typography>
                        <Typography gutterBottom className={classes.value} variant="h4" component="h2">
                            How often do you experience or observe {this.props.card.value}?
                        </Typography>
                        <Typography component="p">
                            &gt; Now?
                        </Typography>
                        <div className={classes.radioGroup}>
                            <FormControl>
                                <RadioGroup
                                    aria-label="Behavior"
                                    name="behavior"
                                    value={this.state.score}
                                    onChange={this.handleChange('score')}
                                    row
                                >
                                    <FormControlLabel value="0" control={<Radio color="primary" />} labelPlacement="bottom" label="Rarely" />
                                    <FormControlLabel value="1" control={<Radio color="primary" />} labelPlacement="bottom" label="Sometimes" />
                                    <FormControlLabel value="2" control={<Radio color="primary" />} labelPlacement="bottom" label="Weekly" />
                                    <FormControlLabel value="3" control={<Radio color="primary" />} labelPlacement="bottom" label="Daily" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Typography component="p">
                            &gt; Future?
                        </Typography>
                        <div className={classes.radioGroup}>
                            <FormControl>
                                <RadioGroup
                                    aria-label="Expection Behavior"
                                    name="expectationBehavior"
                                    value={this.state.expectationScore}
                                    onChange={this.handleChange('expectationScore')}
                                    row
                                >
                                    <FormControlLabel value="0" control={<Radio color="primary" />} labelPlacement="bottom" label="Rarely" />
                                    <FormControlLabel value="1" control={<Radio color="primary" />} labelPlacement="bottom" label="Sometimes" />
                                    <FormControlLabel value="2" control={<Radio color="primary" />} labelPlacement="bottom" label="Weekly" />
                                    <FormControlLabel value="3" control={<Radio color="primary" />} labelPlacement="bottom" label="Daily" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Typography component="p">
                            <u>{this.props.card.value}</u> : {this.props.card.definition}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <PrevButton
                            number={this.props.current - 1}
                            switchCard={this.props.switchCard}
                            disabled={this.props.current > 0 ? false : true}
                        />
                        <div className={classes.grow} />
                        {this.props.cardNumber+1 < 6 ?
                            <NextButton
                                number={this.props.current + 1}
                                switchCard={this.props.switchCard}
                                handleSubmit={this.handleSubmit}
                                disabled={this.state.score!==null && this.state.expectationScore!==null ? false : true}
                            /> :
                            <SubmitButton
                                disabled={this.state.score!==null && this.state.expectationScore!==null ? false : true} 
                            />
                        }
                    </CardActions>
                </Card>
            </div>
        )
    }
}

BehaviorCard.propTypes = { classes: PropTypes.object.isRequired };
const mapStateToProps = ({ survey }) => ({ 
    survey: survey.surveyScore, 
    expectationSurvey: survey.expectationScore 
});
const behaviorCardStyles = withStyles(styles)(BehaviorCard);

export default connect(mapStateToProps)(behaviorCardStyles);