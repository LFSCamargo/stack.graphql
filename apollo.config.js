/**
 * @type {import('apollo').ApolloConfig}
 * @description - This will provide autocomplete for queries
 */
module.exports = {
  client: {
    service: {
      name: "web",
      url: "http://localhost:4000/",
      skipSSLValidation: true,
    },
  },
};
