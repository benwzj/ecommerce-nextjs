export const createCustomerAccessTokenMutation = /* GraphQL */ `
  mutation customerAccessTokenCreate($email: string!, $password: string!) {
    customerAccessTokenCreate(email: $email, password: $password) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }
`;
