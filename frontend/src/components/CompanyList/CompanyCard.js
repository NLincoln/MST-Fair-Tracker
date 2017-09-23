import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import CommentIcon from 'material-ui-icons/Comment';
import LocationIcon from 'material-ui-icons/LocationOn';
import {
  FavoriteCompanyButton,
  LikeCompanyButton,
  DislikeCompanyButton
} from "./CompanyCard/Buttons";

import CommentDialog from './CompanyCard/CommentList';


const Link = (props) => (
  <a href={props.href} target="_blank">{props.children}</a>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired
};

const style = theme => ({
  card: {
    padding: theme.padding,
    position: 'relative',
    boxShadow: theme.shadows[5],
  },
  commentIcon: {
    position: 'absolute',
    right: theme.padding,
  },
  locationIcon: {
    height: '1em'
  },
  location: {
    textAlign: 'right',
    fontSize: '.75em'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

class CompanyCard extends Component {
  state = {
    isDialogOpen: false,
  };

  render() {
    const { props } = this;
    const { classes, company } = props;

    return (
      <Card className={classes.card}>
        <div>
          <Typography type="title" className={classes.title}>
            {company.company_name}
            <span className={classes.location}>
              <LocationIcon className={classes.locationIcon}/>
              {company.city}
            </span>
          </Typography>
          <Typography type="body1">
            {company.description}
          </Typography>
        </div>
        <div>
        <FavoriteCompanyButton {...company}/>
        <LikeCompanyButton {...company}/>
        <DislikeCompanyButton {...company}/>
        <IconButton className={classes.commentIcon} onClick={() => this.setState({
          isDialogOpen: true
        })}>
          <CommentIcon/>
        </IconButton>
        </div>
        <CommentDialog
          isOpen={this.state.isDialogOpen}
          onClose={() => this.setState({
            isDialogOpen: false
          })}
          company={company}
        />
      </Card>
    );
  }
}

export default compose(
  withStyles(style),
)(CompanyCard)
