import React, { Component } from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import { withStyles } from "material-ui/styles";
import CommentIcon from "material-ui-icons/Comment";
import LocationIcon from "material-ui-icons/LocationOn";
import {
  FavoriteCompanyButton,
  LikeCompanyButton,
  DislikeCompanyButton
} from "./CompanyCard/Buttons";
import { Route, Link } from "react-router-dom";

import CommentDialog from "./CompanyCard/CommentList";

const style = theme => ({
  card: {
    padding: theme.padding,
    position: "relative",
    boxShadow: theme.shadows[5]
  },
  commentIcon: {},
  title: {
    display: "flex",
    justifyContent: "space-between"
  },
  ratingButtons: {
    display: "flex",
    justifyContent: "space-between"
  }
});

class CompanyCard extends Component {
  render() {
    const { props } = this;
    const { classes, company } = props;

    return (
      <Card className={classes.card}>
        <div>
          <Typography variant="title" className={classes.title}>
            {company.company_name}
          </Typography>
          <Typography variant="body1">{company.description}</Typography>
        </div>
        <div className={classes.ratingButtons}>
          <div>
            <FavoriteCompanyButton {...company} />
            <LikeCompanyButton {...company} />
            <DislikeCompanyButton {...company} />
          </div>

          <Link to={`/${company.id}/comments`} className={classes.commentIcon}>
            <IconButton>
              <CommentIcon />
            </IconButton>
          </Link>
        </div>
        <Route
          path={`/${company.id}/comments`}
          render={({ history }) => (
            <CommentDialog history={history} company={company} />
          )}
        />
      </Card>
    );
  }
}

export default compose(withStyles(style))(CompanyCard);
