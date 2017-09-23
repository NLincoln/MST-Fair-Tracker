import React, { Component } from 'react';
import CompanyCard from './CompanyCard';
import { withStyles } from 'material-ui/styles';
import { graphql, gql } from 'react-apollo';
import compose from 'recompose/compose';

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
const companiesQuery = gql`
query getCompanies {
  companies {
    id
    company_name
    city
    description
    is_liked
    is_disliked
    is_favorited
    comments {
      id
      text
    }
  }
}
`;

class CompanyList extends Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    }
    return <div className={this.props.classes.list}>
      {this.props.data.companies.map((company) => <CompanyCard key={company.id} company={company}/>)}
    </div>
  }
}
export default compose(
  withStyles(style),
  graphql(companiesQuery)
)(CompanyList);
