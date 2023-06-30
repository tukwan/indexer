import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: number; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
};


export type MutationCreateProjectArgs = {
  projectInput: ProjectInput;
};

export type Project = {
  __typename?: 'Project';
  artistAddress: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ipfsCid: Scalars['String']['output'];
  timeOfMint: Scalars['DateTime']['output'];
};

export type ProjectInput = {
  artistAddress: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  ipfsCid: Scalars['String']['input'];
  timeOfMint: Scalars['DateTime']['input'];
};

export type Query = {
  __typename?: 'Query';
  project?: Maybe<Project>;
  projects: Array<Project>;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};

export type CreateProjectMutationVariables = Exact<{
  projectInput: ProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string | number, ipfsCid: string, artistAddress: string, timeOfMint: any } };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string | number, ipfsCid: string, artistAddress: string, timeOfMint: any } | null };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string | number, ipfsCid: string, artistAddress: string, timeOfMint: any }> };


export const CreateProjectDocument = gql`
    mutation createProject($projectInput: ProjectInput!) {
  createProject(projectInput: $projectInput) {
    id
    ipfsCid
    artistAddress
    timeOfMint
  }
}
    `;
export const GetProjectByIdDocument = gql`
    query getProjectById($id: ID!) {
  project(id: $id) {
    id
    ipfsCid
    artistAddress
    timeOfMint
  }
}
    `;
export const GetProjectsDocument = gql`
    query getProjects {
  projects {
    id
    ipfsCid
    artistAddress
    timeOfMint
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createProject(variables: CreateProjectMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateProjectMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateProjectMutation>(CreateProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createProject', 'mutation');
    },
    getProjectById(variables: GetProjectByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProjectByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProjectByIdQuery>(GetProjectByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProjectById', 'query');
    },
    getProjects(variables?: GetProjectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProjectsQuery>(GetProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProjects', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;