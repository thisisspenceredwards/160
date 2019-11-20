import React, { Component } from 'react';
// import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';

import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

class home extends Component {
	componentDidMount() {
    	this.props.getPosts();
	}

	render() {
		const { posts, loading } = this.props.data;
		let recentPosts = !loading ? (
			posts.map((post) => <Post key={post._id} post={post} />)
		) : (
		<p>Loading..</p>
		);
		return (
			<Grid 
				container  
				direction="column"
				justify="center"
				alignItems="center"
				>
				<Grid item xs={6}>
					{recentPosts}
				</Grid>	
				 
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps, { getPosts })(home);
