import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import MyButton from '../util/MyButton';
import LikeButton from './LikeButton';
// import DeleteButton from './DeleteButton';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

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
 likedPost = () => {
  if(this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.post.postId))
   return true;
  else return false;
 };
 unlikePost = () => {
  this.props.likePost(this.props.post.postId);
 }
 likePost = () => {
  this.props.unlikePost(this.props.post.postId);
 }
  render() {
    dayjs.extend(relativeTime)
    const {
      classes,
      post: {
        body,
        createdAt,
        postId,
        likeCount,
        commentCount,
        _id
      },
      user: {
       authenticated,
       //credentials: { username }
      }
    } = this.props;
    // console.log("this.props.user: "+JSON.stringify(this.props.user));
    const likeButton = !authenticated ? (
     <MyButton tip="Like">
      <Link to="/login">
       <FavoriteBorder color="primary" />
      </Link>
     </MyButton>
    ) : this.likedPost() ? (
     <MyButton tip="Undo like" onClick={this.unlikePost}>
      <FavoriteIcon color="primary" />
     </MyButton>
    ) : (
     <MyButton tip="Like" onClick={this.likePost}>
      <FavoriteIcon color="primary" />
     </MyButton>
    );
     
    // const deleteButton = authenticated ? (
    //  <DeleteButton postId={postId} />
    //  ) : null
    var delete_button;
    if (this.props.user.id === this.props.post.userID) {
        delete_button = (
            <span>
                <MyButton tip="delete">
                    <DeleteIcon color="primary" />
                </MyButton>
                <span>Delete</span>
            </span>
        );
    } else {
        delete_button = <span></span>;
    }

    return (
      <Card className={classes.card}>
    
        <CardContent className={classes.content}>
          <Typography variant="body1">
            {body}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>

          <LikeButton postId={postId} /> 
          <span>{likeCount} Likes</span>
          
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>

          {delete_button}

          
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
 likePost,
 unlikePost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
