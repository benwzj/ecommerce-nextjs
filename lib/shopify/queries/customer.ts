export const getCustomerQuery = /* GraphQL */ `
  query getCustomer($customerAccessToken: string!) {
    id
    firstName
    lastName
    acceptsMarketing
    email
    phone
  }
`;
