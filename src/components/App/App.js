import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AddEmployees from '../Manager/AddEmployees';
import AdminOrgMain from '../AdminOrgMain/AdminOrgMain';
import Survey from '../Survey/Survey';
import UserMain from '../UserMain/UserMain';
import Registration from '../Registration/Registration';
import './App.css';
import AdminMain from '../AdminMain/AdminMain';
import NewOrgForm from '../AdminMain/NewOrgForm';
import CompletedFeedback from '../CompletedFeedback/CompletedFeedback';
import Messages from '../Messages/AllMessages';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: indigo,
    secondary: teal,
    errors: red,
  }
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/main" />
              <Route
                exact
                path="/register"
                component={Registration}
              />
              <ProtectedRoute
                exact
                path="/addemployees"
                component={AddEmployees}
              />
              <ProtectedRoute
                exact
                path="/survey"
                component={Survey}
              />
              <ProtectedRoute
                exact
                path="/main"
                component={UserMain}
              />
              <ProtectedRoute
                exact
                path="/adminmain"
                component={AdminMain}
              />
              <ProtectedRoute
                exact
                path="/adminmain/organization/:id"
                component={AdminOrgMain}
              />
              <ProtectedRoute
                exact
                path="/adminmain/createneworganization"
                component={NewOrgForm}
              />
              <ProtectedRoute
                exact
                path="/viewparticipation"
                render={() => <CompletedFeedback useOrgId={true} />}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Messages />
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(App);
