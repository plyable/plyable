import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BehaviorCard from './BehaviorCard';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#00868b',
            sub: '#009688',
        },
        secondary: {
            main: '#EC407A',
        },
    }
});

const styles = () => ({
    outFrame: {
        margin: '0 5px',
    },
    cardFrame: {
        border: '1px solid #00868b',
        borderRadius: '20px',
        margin: '0 auto',
        padding: '0 0 1px 0',
        maxWidth: '710px',
        backgroundColor: theme.palette.primary.main,
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: '25px',
        margin: '10px 0 15px 0',
    },
    stepper: {
        backgroundColor: theme.palette.primary.main,
    },
    connectorActive: {
      '& $connectorLine': {
        borderColor: theme.palette.primary.sub,
      },
    },
    connectorCompleted: {
      '& $connectorLine': {
        borderColor: theme.palette.primary.main,
      },
    },
    connectorDisabled: {
      '& $connectorLine': {
        borderColor: theme.palette.grey[100],
      },
    },
    connectorLine: {
      transition: theme.transitions.create('border-color'),
    },
});

class Survey extends Component {
    state = {
        openCard: 0, //this determines which of the cards is being rendered
    }

    componentDidMount = () => {
        //on mount, fetch data reguarding this weeks survey
        this.props.dispatch({ type: 'FETCH_BEHAVIORS' });
    }

    switchCard = (number, keyword) => {
        this.setState({ openCard: number });
        if (keyword === 'prev') {
            this.props.dispatch({
                type: 'REMOVE_BEHAVIOR',
                payload: {
                    id: this.props.behaviors[this.state.openCard - 1].id
                }
            });
        }
    }

    render() {
        let cards = this.props.behaviors;
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Stepper 
                    activeStep={this.state.openCard}
                    connector={
                        <StepConnector 
                            classes={{
                                active: classes.connectorActive,
                                completed: classes.connectorCompleted,
                                disabled: classes.connectorDisabled,
                                line: classes.connectorLine,
                            }} 
                        />
                    }
                >
                    {cards.map(card => <Step key={card.id}><StepLabel></StepLabel></Step>)}
                </Stepper>
                <div className={classes.outFrame}>
                    <div className={classes.cardFrame}>
                        <p className={classes.title}>At <b>{this.props.user.org_name}</b>...</p>
                        <BehaviorCard
                            card={cards[this.state.openCard] || { value: 'Loading' }}
                            current={this.state.openCard}
                            switchCard={this.switchCard}
                            cardNumber={this.state.openCard}
                        />
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = ({ behaviorReducer, user }) => ({
    behaviors: behaviorReducer.behaviors,
    user,
});

export default connect(mapStateToProps)(withStyles(styles)(Survey));
