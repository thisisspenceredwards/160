import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

//Customize color with this tool
//https://material-ui.com/customization/color/#color-tool
const theme = createMuiTheme(themeFile);

// let authenticated;
// const token = localStorage.sessionToken;
// if(token) {
//   const decodedToken = jwtDecode(token);
//   //Check if token is expired
//   if(decodedToken.exp * 1000 < Date.now()) {
//     window.location.href='/login'
//     authenticated = false;
//   } else {
//     authenticated = true;
//   }
// }

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
      </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
