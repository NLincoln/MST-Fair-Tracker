import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import { gql, graphql } from 'react-apollo';
import compose from 'recompose/compose';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

const getComments = gql`
  query getComments($id: ID!) {
    company(id: $id) {
      id
      comments {
        id
        text
      }
    }
  }
`;



class CommentsListDialog extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  };

  render() {
    const { classes, company } = this.props;
    if (this.props.data.loading) {
      return null
    }

    const { comments } = this.props.data.company;

    return (
      <Dialog
        fullScreen
        open={this.props.isOpen}
        onRequestClose={this.props.onClose}
        transition={<Slide direction="up" />}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="contrast" onClick={this.props.onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Comments for {company.company_name}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {comments.length === 0 &&
            <ListItem>
              <ListItemText primary="No Comments" />
            </ListItem>
          }
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText primary={comment.text} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }
}

export default compose(
  withStyles(styles),
  graphql(getComments, {
    options: (props) => ({
      variables: {
        id: props.company.id
      }
    })
  })
)(CommentsListDialog);
