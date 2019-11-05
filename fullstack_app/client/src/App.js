import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

import axios from 'axios';

//Customize color with this tool
//https://material-ui.com/customization/color/#color-tool
const theme = createMuiTheme(themeFile);

const token = localStorage.sessionToken;
if(token) {
 console.log(token);
 store.dispatch({ type: SET_AUTHENTICATED });
 axios.defaults.headers.common['Authorization'] = token;
 store.dispatch(getUserData());
}
//  else {
//  store.dispatch(logoutUser())
//  window.location.href='/login';
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
        <AuthRoute exact path="/login" component={login} />
        <AuthRoute exact path="/signup" component={signup} />
       </Switch>
      </div>
     </Router>
    </Provider>
   </MuiThemeProvider>
  );
 }
}

export default App;
