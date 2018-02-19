import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import IconButton from "material-ui/IconButton";
import { withStyles } from "material-ui/styles";
import FavoriteIcon from "material-ui-icons/Favorite";
import ThumbsDownIcon from "material-ui-icons/ThumbDown";
import ThumbsUpIcon from "material-ui-icons/ThumbUp";
import compose from "recompose/compose";
import classnames from "classnames";

// language=GraphQL
const likeCompany = gql`
  mutation likeCompany($id: ID!) {
    likeCompany(id: $id) {
      id
      company_name
      is_liked
      is_disliked
      is_favorited
    }
  }
`;

const dislikeCompany = gql`
  mutation dislikeCompany($id: ID!) {
    dislikeCompany(id: $id) {
      id
      company_name
      is_liked
      is_disliked
      is_favorited
    }
  }
`;
const favoriteCompany = gql`
  mutation favoriteCompany($id: ID!) {
    favoriteCompany(id: $id) {
      id
      company_name
      is_liked
      is_disliked
      is_favorited
    }
  }
`;

const createButton = (mutation, Icon, { prop, style }) => {
  const component = props => (
    <IconButton onClick={() => props.mutate()}>
      <Icon
        className={classnames({
          [props.classes.iconEnabled]: props[prop]
        })}
      />
    </IconButton>
  );
  const query = graphql(mutation, {
    options: props => ({
      variables: {
        id: props.id
      }
    })
  });

  const styles = theme => ({
    iconEnabled: {
      ...style
    }
  });

  return compose(query, withStyles(styles))(component);
};

export const DislikeCompanyButton = createButton(
  dislikeCompany,
  ThumbsDownIcon,
  {
    prop: "is_disliked",
    style: {
      color: "blue"
    }
  }
);
export const LikeCompanyButton = createButton(likeCompany, ThumbsUpIcon, {
  prop: "is_liked",
  style: {
    color: "green"
  }
});
export const FavoriteCompanyButton = createButton(
  favoriteCompany,
  FavoriteIcon,
  {
    prop: "is_favorited",
    style: {
      color: "red"
    }
  }
);
