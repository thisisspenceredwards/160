import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MyButton from '../util/MyButton';
import CreatePost from './CreatePost';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import { logoutUser } from '../redux/actions/userActions';

class Navbar extends Component {
	handleLogout = () => {
		this.props.logoutUser();
	};

	render() {
		const { authenticated } = this.props
		return (
			<AppBar>
				<ToolBar className="nav-container">
					{authenticated ? (
						<Fragment>
							<CreatePost />
							<Link to="/">
								<MyButton tip="Home">
									<HomeIcon />
								</MyButton>
							</Link>
							<MyButton tip="Logout" onClick={this.handleLogout}>
								<KeyboardReturn />
							</MyButton>
						</Fragment>
						) : (
						<Fragment>
							<Button color="inherit" component={Link} to="/login">Login</Button>
							<Button color="inherit" component={Link} to="/">Home</Button>
							<Button color="inherit" component={Link} to="/signup">Signup</Button>
						</Fragment>
						)}
				</ToolBar>
			</AppBar>
		);
	}
}

const mapStateToProps = state => ({
	authenticated: state.user.authenticated
});

const mapActionsToProps = { logoutUser };

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
