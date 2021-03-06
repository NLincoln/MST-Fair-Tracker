import React, { Component } from "react";
import CompanyCard from "./CompanyCard";
import { withStyles } from "material-ui/styles";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import compose from "recompose/compose";
import NewCompanyCard from "./NewCompanyCard";

const style = theme => ({
  list: {
    display: "grid",
    [theme.breakpoints.only("sm")]: {
      gridTemplateColumns: "1fr 1fr"
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr"
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr"
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
  onNewCompany = () => {
    return this.props.data.refetch();
  };
  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    return (
      <div className={this.props.classes.list}>
        {this.props.data.companies.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
        <NewCompanyCard onSubmit={this.onNewCompany} />
      </div>
    );
  }
}
export default compose(withStyles(style), graphql(companiesQuery))(CompanyList);
