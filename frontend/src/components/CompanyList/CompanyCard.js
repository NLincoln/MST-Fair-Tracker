import React, { Component } from 'react';
import { Card, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = theme => ({
  card: {
    padding: theme.padding
  }
});

class CompanyCard extends Component {
  render() {
    const { props } = this;
    const { classes } = props;

    return (
      <Card className={classes.card}>
        <Typography type="title">
          IntelliFarms 
        </Typography>
        <Typography type="body1">
          Creates farm equipment
        </Typography>
        
      </Card>
    );
  }
}

export default withStyles(style)(CompanyCard);