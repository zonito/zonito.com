import { gql } from '@apollo/client'

export const ADD_TAG = gql`
  mutation addTag($name: String!) {
    addTag(name: $name) {
      name
    }
  }
`

export const DELETE_TAG = gql`
  mutation deleteTag($id: ID!) {
    deleteTag(id: $id)
  }
`
