import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  ...theme.spreadThis
});

class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			username: '',
			loading: false,
			errors: {},
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			username: this.state.username,
		}
		axios.post('/putUser', newUserData)
			.then((res) => {
				localStorage.setItem('sessionToken', `Bearer ${res.data.token}`);
				this.setState({
					loading: false
				});
				this.props.history.push('/');
			})
			.catch((err) => {
				this.setState({
					errors: err.response.data,
					loading: false
				});
			});
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<Typography variant="h2" className={classes.pageTitle}>
						Signup
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField 
							id="email" 
							name="email"
							label="Email" 
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email} 
							onChange={this.handleChange} 
							fullWidth 
						/>
						<TextField 
							id="password" 
							name="password"
							label="Password" 
							className={classes.textField}
							helperText={errors.password}
							error={errors.password ? true : false}
							value={this.state.password} 
							onChange={this.handleChange} 
							fullWidth 
						/>
						<TextField 
							id="confirmPassword" 
							name="confirmPassword"
							label="Confirm Password" 
							className={classes.textField}
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
							value={this.state.confirmPassword} 
							onChange={this.handleChange} 
							fullWidth 
						/>
						<TextField 
							id="username" 
							name="username"
							label="Username" 
							className={classes.textField}
							helperText={errors.username}
							error={errors.username ? true : false}
							value={this.state.username} 
							onChange={this.handleChange} 
							fullWidth 
						/>
						<Button 
							type="submit" 
							variant="contained" 
							color="primary" 
							className={classes.button} 
						>
						Signup
						</Button>
						<br />
						<small>
							Already have an account? Login <Link to="/login">here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

export default withStyles(styles)(signup);