
import { ApolloServer } from "@apollo/server";
import { MongoClient } from "mongodb";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";
import { typeDefs } from "./schema.ts";
import { Hola } from "./types.ts";


const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("extraordinario2425");
const RecuCollection = mongoDB.collection<Hola>("recu");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ RecuCollection }),
});

console.info(`Server ready at ${url}`); 