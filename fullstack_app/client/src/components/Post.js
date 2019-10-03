import React from 'react';

const Post = ({ text }) => {
	return (
		<div className='tc bg-light-gray dib pa2 ma2 grow '>
			<div>
	  			<p>{text}</p>
			</div>
		</div>
	);
}
export default Post;