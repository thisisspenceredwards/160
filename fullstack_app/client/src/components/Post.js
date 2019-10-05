import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme.spreadThis
});

class Post extends Component {
	render() {
		const { classes, 
			post : { body, createdAt, topicId, likeCount, commentCount } } = this.props;

		return (
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<Typography variant="h5">{topicId}</Typography>
					<Typography variant="body2" color="textSecondary">{createdAt}</Typography>
					<Typography variant="body1">{body}</Typography>					
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(styles)(Post);
