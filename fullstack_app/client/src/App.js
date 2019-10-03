import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import PostList from './components/PostList';
import './App.css';

// Initialize state. Can add more properties later
const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
    }})
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
            <Dashboard name={this.state.user.name} />
          </div>
          : (
            (route === 'signin' || route === 'signout')
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;