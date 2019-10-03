import React from 'react';
import Post from './Post';

const PostList = ({ feed }) => {
	return (
		<div> {
			feed.map( (i) => {
				return (
					<Post first_name={feed[i].body} />
				);
			})
		}
		</div>
	);
}

export default PostList;