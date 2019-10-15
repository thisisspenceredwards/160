import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';

import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

class home extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		const { posts } = this.props.data;
		let recentPosts = posts ? (
			posts.map((post) => <Post key={post.postId} post={post} />)
		) : (
		<p>Loading..</p>
		);
		return (
			<Grid container spacing={10}>
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

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getPosts }
)(home);