import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import InfoIcon from '@material-ui/icons/Info';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ListAlt from '@material-ui/icons/ListAlt';
import securityLevel from '../../constants/securityLevel';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        color: 'white',
    },
};

class NavDrawer extends React.Component {
    state = {
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    handleAdminMainClick = () => {
        this.props.history.push('/adminmain')
    }
    handleMainClick = () => {
        this.props.history.push('/main')
    }
    handleSurveyStatusClick = () => {
        this.props.history.push('/viewparticipation')
    }
    handleAddEmployeesClick = () => {
        this.props.history.push('/addemployees')
    }
    handleInfoClick = () => {
        this.props.history.push('/info')
    }

    render(props) {
        const { classes } = this.props;
        const sideList = (
            <div>
                {this.props.user.security_level === securityLevel.ADMIN_ROLE &&
                    <div className={classes.list}>
                        <List>
                            <ListItem button onClick={this.handleAdminMainClick}>
                                <ListItemIcon>
                                    <ListAlt />
                                </ListItemIcon>
                                <ListItemText primary="Main" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            {/* <ListItem button onClick={this.handleInfoClick}>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="Info" />
                            </ListItem> */}
                            <ListItem button onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
                                <ListItemIcon>
                                    <VerifiedUserIcon />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" />
                            </ListItem>
                        </List>
                    </div>}
                {this.props.user.security_level === securityLevel.MANAGER_ROLE &&
                    <div className={classes.list}>
                        <List>
                            <ListItem button onClick={this.handleMainClick}>
                                <ListItemIcon>
                                    <ListAlt />
                                </ListItemIcon>
                                <ListItemText primary="Main" />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem button onClick={this.handleSurveyStatusClick}>
                                <ListItemIcon>
                                    <ListAlt />
                                </ListItemIcon>
                                <ListItemText primary="Survey Status" />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem button onClick={this.handleAddEmployeesClick}>
                                <ListItemIcon>
                                    <ListAlt />
                                </ListItemIcon>
                                <ListItemText primary="Invite Employees" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            {/* <ListItem button onClick={this.handleInfoClick}>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="Info" />
                            </ListItem> */}
                            <ListItem button onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
                                <ListItemIcon>
                                    <VerifiedUserIcon />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" />
                            </ListItem>
                        </List>
                    </div>}
                {this.props.user.security_level === securityLevel.EMPLOYEE_ROLE &&
                    <div className={classes.list}>
                        <List>
                            <ListItem button onClick={this.handleMainClick}>
                                <ListItemIcon>
                                    <ListAlt />
                                </ListItemIcon>
                                <ListItemText primary="Main" />
                            </ListItem>
                            <ListItem button onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
                                <ListItemIcon>
                                    <VerifiedUserIcon />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" />
                            </ListItem>
                        </List>
                    </div>}
            </div>
        );

        return (
            <div>
                <Button onClick={this.toggleDrawer('right', true)} className={classes.menuButton}><MenuIcon /></Button>
                <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('right', false)}
                        onKeyDown={this.toggleDrawer('right', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

NavDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    user: state.user,
});

const navDrawerStyles = withStyles(styles)(NavDrawer);

const navDrawerRouterStyles = withRouter(navDrawerStyles);

export default connect(mapStateToProps)(navDrawerRouterStyles);

