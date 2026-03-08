import fs from "fs";
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function seed() {
  await client.connect();
  const db = client.db("pms");

  const vehicles = JSON.parse(fs.readFileSync("./seed/vehicles.json"));
  const lots = JSON.parse(fs.readFileSync("./seed/lots.json"));
  const operators = JSON.parse(fs.readFileSync("./seed/operators.json"));

  await db.collection("vehicles").deleteMany({});
  await db.collection("lots").deleteMany({});
  await db.collection("operators").deleteMany({});

  await db.collection("vehicles").insertMany(vehicles);
  await db.collection("lots").insertMany(lots);
  await db.collection("operators").insertMany(operators);

  console.log("Database seeded successfully");
  process.exit();
}

seed();