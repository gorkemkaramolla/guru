import { gql } from '@apollo/client';
import axios from 'axios';

async function registerUser(
  name: string,
  surname: string,
  email: string,
  password: string
) {
  try {
    const response = await axios.post('/api/user/register', {
      name,
      surname,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
//MUTATIONS & QUERIES
const UPDATE_USER_NAME_MUTATION = gql`
  mutation UpdateUserName($at: String!, $name: String!) {
    updateUserName(at: $at, name: $name) {
      at
      name
    }
  }
`;
const UPDATE_USER_LAST_NAME_MUTATION = gql`
  mutation UpdateUserLastame($at: String!, $lastname: String!) {
    updateUserLastname(at: $at, lastname: $lastname) {
      at
      lastname
    }
  }
`;
const GET_USER = gql`
  query GetUser($at: String!) {
    getUser(at: $at) {
      name
      lastname
      email
      register_date
      profilePic
      at
    }
  }
`;
const GET_USERS = gql`
  query {
    getUsers {
      name
      email
      profilePic
    }
  }
`;
export {
  UPDATE_USER_NAME_MUTATION,
  UPDATE_USER_LAST_NAME_MUTATION,
  GET_USER,
  GET_USERS,
  registerUser,
};
