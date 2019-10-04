import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';

class home extends Component {
	state = {
		posts: null,
	};

//Need to get correct API here
	componentDidMount() {
		axios
			.get('http://localhost:3001/api/org') 
			.then((res) => {
				console.log(res.data[1]);
				this.setState({
					posts: res.data
				});
			})
			.catch((err) => console.log(err));
	}

	render() {
		let recentPosts = this.state.posts ? (
			this.state.posts.map((post) => <Post post={post} />)
		) : (
		<p>Loading..</p>
		);
		return (
			<Grid container spacing={16}>
				<Grid item sm={8} xs={12}>
					{recentPosts}
				</Grid>	
				<Grid item sm={4} xs={12}>
					<p>Something goes here</p>
				</Grid>	
			</Grid>
		);
	}
}

export default home;