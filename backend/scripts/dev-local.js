// Starts the API against a throwaway in-memory MongoDB (no local install needed).
const { MongoMemoryServer } = require("mongodb-memory-server");

(async () => {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGO_URL = mongod.getUri("edgetrade");
  console.log("In-memory MongoDB at", process.env.MONGO_URL);
  require("../index.js");
})();
