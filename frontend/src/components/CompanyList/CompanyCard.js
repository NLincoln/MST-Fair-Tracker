import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, IconButton } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import FavoriteIcon from 'material-ui-icons/Favorite';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import ThumbsDownIcon from 'material-ui-icons/ThumbDown';
import ThumbsUpIcon from 'material-ui-icons/ThumbUp';
import CommentIcon from 'material-ui-icons/Comment';

const Link = (props) => (
  <a href={props.href} target="_blank">{props.children}</a>
);

Link.propTypes = {
  children: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired
};

const style = theme => ({
  card: {
    padding: theme.padding,
    position: 'relative'
  },
  commentIcon: {
    position: 'absolute',
    right: theme.padding,
  }
});

class CompanyCard extends Component {
  render() {
    const { props } = this;
    const { classes } = props;

    return (
      <Card className={classes.card}>
        <div>
          <Typography type="title">
            IntelliFarms
          </Typography>
          <Typography type="body1">
            Creates farm equipment
          </Typography>
          <Link href="https://intellifarms.com">
            Careers Page
          </Link>
        </div>
        <IconButton>
          <ThumbsDownIcon/>
        </IconButton>
        <IconButton>
          <ThumbsUpIcon/>
        </IconButton>
        <IconButton>
          <FavoriteBorderIcon/>
        </IconButton>
        <IconButton className={classes.commentIcon}>
          <CommentIcon/>
        </IconButton>
      </Card>
    );
  }
}

export default withStyles(style)(CompanyCard);