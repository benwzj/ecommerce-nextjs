export const createCustomerAccessTokenMutation = /* GraphQL */ `
  mutation customerAccessTokenCreateMutation($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const createCustomerMutation = /* GraphQL */ `
  mutation customerCreateMutation($email: String!, $password: String!) {
    customerCreate(input: { email: $email, password: $password }) {
      customer {
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;
