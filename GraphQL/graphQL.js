const { graphql, buildSchema }  = require('graphql')

let schema = buildSchema(`
  type Query {
    hello: String
  }
`)

let root = { hello: () => 'Hello World!' }

graphql(schema, '{ hello }', root)
  .then((response) => {
    console.log(response)
  })