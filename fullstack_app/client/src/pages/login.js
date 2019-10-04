import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
	form: {
		textAlign: 'center'
	},
	pageTitle: {
		margin: '10px auto 10px auto'
	},
 	textField: {
    margin: '10px auto 10px auto'
  },
  button: {
  	marginTop: 20
  }
};

class login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			loading: false,
			errors: {},
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const userData = {
			email: this.state.email,
			password: this.state.password
		}
		axios.post('/login', userData)
			.then(res => {
				console.log(res.data);
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
						Login
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
						<Button 
							type="submit" 
							variant="contained" 
							color="primary" 
							className={classes.button} 
						>
						Login
						</Button>
						<br />
						<small>
							Don't have an account? Sign up here <Link to="/signup">here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}



export default withStyles(styles)(login);
