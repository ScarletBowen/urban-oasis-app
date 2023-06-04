const { ApolloServer } = require("apollo-server-express");

const fs = require("fs");
const path = require("path");
require("dotenv").config();
require("./config/database").connect();
const app = require("express")();

const port = process.env.PORT || 3000;

const gqlFiles = fs.readdirSync(path.join(__dirname, "./graphql/typedefs"));
let typeDefs = "";
gqlFiles.forEach((file) => {
  typeDefs += fs.readFileSync(
    path.join(__dirname, "./graphql/typedefs", file),
    {
      encoding: "utf8",
    }
  );
});

const resolvers = require("./graphql/resolvers");

let apolloServer = {
  graphqlPath: "",
};

async function startServer() {
  apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });
}
startServer();

app.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
});
