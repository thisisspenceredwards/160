import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import MyButton from '../util/MyButton';
import LikeButton from './LikeButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Post extends Component {
  render() {
    dayjs.extend(relativeTime)
    const {
      classes,
      post: {
        body,
        createdAt,
        postId,
        likeCount,
        commentCount
      }
    } = this.props;

    return (
      <Card className={classes.card}>
    
        <CardContent className={classes.content}>
          <Typography variant="body1">
            {body}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <LikeButton screamId={postId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>

        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));