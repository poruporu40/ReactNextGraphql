import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $authorId: Int) {
    createPost(title: $title, content: $content, author_id: $authorId) {
      id
      title
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $profile: String!
    $location: String!
    $website: String!
    $avatarPath: String
  ) {
    updateUserProfile(
      profile: $profile
      location: $location
      website: $website
      avatarPath: $avatarPath
    ) {
      profile
      location
      website
      avatarPath
    }
  }
`;
