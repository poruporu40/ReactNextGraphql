import { gql } from '@apollo/client';

export const HELLO = gql`
  query hello {
    hello
  }
`;

export const USER_PROFILE = gql`
  query userProfile {
    user {
      id
      auth0UserId
      name
      email
      profile
      location
      website
      avatarPath
    }
  }
`;

export const AUTH0_ID = gql`
  query auth0Id {
    auth0Id
  }
`;

export const ALL_POSTS = gql`
  query allPosts {
    allPosts {
      id
      title
      content
      published
    }
  }
`;
