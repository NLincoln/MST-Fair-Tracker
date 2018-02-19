import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Dialog from "material-ui/Dialog";
import List, { ListItem, ListItemText } from "material-ui/List";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import TextField from "material-ui/TextField";
import SendIcon from "material-ui-icons/Send";

import Slide from "material-ui/transitions/Slide";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import compose from "recompose/compose";
const styles = theme => ({
  appBar: {
    position: "relative"
  },
  textWrapper: {
    position: "relative",
    padding: theme.padding,
    display: "flex"
  },
  closeIcon: {
    color: "white"
  },
  textField: {
    width: "calc(100% - 32px)"
  },
  sendIcon: {
    position: "absolute",
    right: 0,
    height: "32px"
  },
  flex: {
    flex: 1
  }
});

const createComment = gql`
  mutation createComment($company: ID!, $comment: CommentInput!) {
    createComment(company: $company, comment: $comment) {
      id
      text
    }
  }
`;

class CommentsListDialog extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired
  };

  state = {
    commentText: ""
  };

  mutate = async () => {
    await this.props.mutate({
      variables: {
        comment: {
          text: this.state.commentText
        },
        company: this.props.company.id
      }
    });
    this.setState({
      commentText: ""
    });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      return this.mutate();
    }
  };

  onTextChange = e => {
    this.setState({
      commentText: e.target.value
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { classes, company } = this.props;
    const { comments } = this.props.company;

    return (
      <Dialog
        fullScreen
        open={true}
        onClose={this.props.onClose}
        transition={props => <Slide direction="up" {...props} />}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.closeIcon}
              color="secondary"
              onClick={this.onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Comments for {company.company_name}
            </Typography>
          </Toolbar>
        </AppBar>

        <List>
          {comments.length === 0 && (
            <ListItem>
              <ListItemText primary="No Comments" />
            </ListItem>
          )}
          {comments.map(comment => (
            <ListItem key={comment.id}>
              <ListItemText primary={comment.text} />
            </ListItem>
          ))}
        </List>
        <div className={classes.textWrapper}>
          <TextField
            className={classes.textField}
            multiline
            value={this.state.commentText}
            onChange={this.onTextChange}
            placeholder={`Add a comment for ${company.company_name}`}
            onKeyPress={this.handleKeyPress}
          />
          <IconButton className={classes.sendIcon} onClick={this.mutate}>
            <SendIcon />
          </IconButton>
        </div>
      </Dialog>
    );
  }
}

export default compose(
  withStyles(styles),
  graphql(createComment, {
    options: props => ({
      refetchQueries: ["getCompanies"]
    })
  })
)(CommentsListDialog);
