import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createUser: User;
  deletePost: Post;
  deleteUser: User;
  registerUser?: Maybe<Scalars['Boolean']['output']>;
  updatePost: Post;
  updateUser: User;
  updateUserProfile: User;
};


export type MutationCreatePostArgs = {
  author_id?: InputMaybe<Scalars['Int']['input']>;
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  auth0UserId: Scalars['String']['input'];
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRegisterUserArgs = {
  auth0UserId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserProfileArgs = {
  avatarPath?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  profile: Scalars['String']['input'];
  website: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  allPosts: Array<Post>;
  allUsers: Array<User>;
  auth0Id: Scalars['String']['output'];
  hello?: Maybe<Scalars['String']['output']>;
  postById?: Maybe<Post>;
  user: User;
  userExists?: Maybe<Scalars['Boolean']['output']>;
};


export type QueryPostByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserExistsArgs = {
  auth0UserId: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  auth0AvatarUrl?: Maybe<Scalars['String']['output']>;
  auth0UserId: Scalars['String']['output'];
  avatarPath?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  posts: Array<Post>;
  profile?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  authorId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, title: string } };

export type UpdateUserProfileMutationVariables = Exact<{
  profile: Scalars['String']['input'];
  location: Scalars['String']['input'];
  website: Scalars['String']['input'];
  avatarPath?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'User', profile?: string | null, location?: string | null, website?: string | null, avatarPath?: string | null } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello?: string | null };

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, auth0UserId: string, name: string, email: string, profile?: string | null, location?: string | null, website?: string | null, avatarPath?: string | null } };

export type Auth0IdQueryVariables = Exact<{ [key: string]: never; }>;


export type Auth0IdQuery = { __typename?: 'Query', auth0Id: string };

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = { __typename?: 'Query', allPosts: Array<{ __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean }> };


export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $content: String!, $authorId: Int) {
  createPost(title: $title, content: $content, author_id: $authorId) {
    id
    title
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($profile: String!, $location: String!, $website: String!, $avatarPath: String) {
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
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      profile: // value for 'profile'
 *      location: // value for 'location'
 *      website: // value for 'website'
 *      avatarPath: // value for 'avatarPath'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const HelloDocument = gql`
    query hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export function useHelloSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloSuspenseQueryHookResult = ReturnType<typeof useHelloSuspenseQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const UserProfileDocument = gql`
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

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export function useUserProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileSuspenseQueryHookResult = ReturnType<typeof useUserProfileSuspenseQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const Auth0IdDocument = gql`
    query auth0Id {
  auth0Id
}
    `;

/**
 * __useAuth0IdQuery__
 *
 * To run a query within a React component, call `useAuth0IdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuth0IdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuth0IdQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuth0IdQuery(baseOptions?: Apollo.QueryHookOptions<Auth0IdQuery, Auth0IdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Auth0IdQuery, Auth0IdQueryVariables>(Auth0IdDocument, options);
      }
export function useAuth0IdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Auth0IdQuery, Auth0IdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Auth0IdQuery, Auth0IdQueryVariables>(Auth0IdDocument, options);
        }
export function useAuth0IdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Auth0IdQuery, Auth0IdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Auth0IdQuery, Auth0IdQueryVariables>(Auth0IdDocument, options);
        }
export type Auth0IdQueryHookResult = ReturnType<typeof useAuth0IdQuery>;
export type Auth0IdLazyQueryHookResult = ReturnType<typeof useAuth0IdLazyQuery>;
export type Auth0IdSuspenseQueryHookResult = ReturnType<typeof useAuth0IdSuspenseQuery>;
export type Auth0IdQueryResult = Apollo.QueryResult<Auth0IdQuery, Auth0IdQueryVariables>;
export const AllPostsDocument = gql`
    query allPosts {
  allPosts {
    id
    title
    content
    published
  }
}
    `;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
      }
export function useAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
        }
export function useAllPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsSuspenseQueryHookResult = ReturnType<typeof useAllPostsSuspenseQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;