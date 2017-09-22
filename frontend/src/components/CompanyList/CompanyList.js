import React, { Component } from 'react';
import CompanyCard from './CompanyCard';
import { withStyles } from 'material-ui/styles';

const style = theme => ({
  list: {
    display: 'grid',
    [theme.breakpoints.only('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr'
    },
    gridGap: theme.padding
  }
});

class CompanyList extends Component {
  render() {
    return <div className={this.props.classes.list}>
      <CompanyCard/>
      <CompanyCard/>
      <CompanyCard/>
      <CompanyCard/>
    </div>
  }
}

export default withStyles(style)(CompanyList);