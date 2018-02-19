import React from "react";
import { withStyles } from "material-ui/styles";
import Dialog from "material-ui/Dialog";
import List, { ListItem, ListItemText } from "material-ui/List";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import AddIcon from "material-ui-icons/Add";

import TextField from "material-ui/TextField";
import SendIcon from "material-ui-icons/Send";
import Slide from "material-ui/transitions/Slide";
import Card from "material-ui/Card";
import Button from "material-ui/Button";

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import compose from "recompose/compose";
import { Route, Link, withRouter } from "react-router-dom";
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
    width: "calc(100%)"
  },
  sendIcon: {
    position: "absolute",
    right: 0,
    height: "32px"
  },
  flex: {
    flex: 1
  },
  submitButton: {
    width: "100%"
  },
  newCard: {
    boxShadow: theme.shadows[5],

    minHeight: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
});

const CREATE_COMPANY = gql`
  mutation createCompany($name: String!, $description: String!) {
    createCompany(name: $name, description: $description) {
      id
      company_name
      description
    }
  }
`;
const Transition = props => <Slide direction="up" {...props} />;

const NewCompanyDialog = withStyles(styles)(
  graphql(CREATE_COMPANY)(
    class extends React.Component {
      state = {
        name: "",
        description: ""
      };

      onChange = key => event =>
        this.setState({
          [key]: event.target.value
        });

      onSubmit = async () => {
        await this.props.mutate({
          variables: {
            name: this.state.name,
            description: this.state.description
          }
        });
        this.props.history.goBack();
        this.props.onSubmit();
      };

      onClose = () => {
        this.props.history.goBack();
      };

      render() {
        const { classes } = this.props;
        return (
          <React.Fragment>
            <Dialog
              fullScreen
              open={true}
              onClose={this.onClose}
              transition={Transition}
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
                  <Typography
                    variant="title"
                    color="inherit"
                    className={classes.flex}
                  >
                    Create New Company
                  </Typography>
                </Toolbar>
              </AppBar>

              <div className={classes.textWrapper}>
                <TextField
                  label={"Company Name"}
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.onChange("name")}
                />
              </div>
              <div className={classes.textWrapper}>
                <TextField
                  label={"Description"}
                  multiline={true}
                  className={classes.textField}
                  value={this.state.description}
                  onChange={this.onChange("description")}
                />
              </div>
              <div className={classes.textWrapper}>
                <Button
                  variant={"raised"}
                  color={"primary"}
                  size={"large"}
                  className={classes.submitButton}
                  onClick={this.onSubmit}
                >
                  Submit
                </Button>
              </div>
            </Dialog>
          </React.Fragment>
        );
      }
    }
  )
);

class NewCompanyCard extends React.Component {
  onCardClick = () => {
    this.props.history.push("/new");
  };
  render() {
    return (
      <React.Fragment>
        <Card className={this.props.classes.newCard} onClick={this.onCardClick}>
          <Typography variant={"title"}>New Company</Typography>
          <AddIcon />
        </Card>
        <Route path={"/new"} component={NewCompanyDialog} />
      </React.Fragment>
    );
  }
}
export default compose(withStyles(styles), withRouter)(NewCompanyCard);
