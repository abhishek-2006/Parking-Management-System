import fs from "fs";
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function seed() {
  await client.connect();
  const db = client.db("pms");

  const lots = JSON.parse(fs.readFileSync("./seed/lots.json"));
  const operators = JSON.parse(fs.readFileSync("./seed/operators.json"));
  const parkingRecords = JSON.parse(fs.readFileSync("./seed/parkingRecords.json"));
  const rates = JSON.parse(fs.readFileSync("./seed/rates.json"));

  await db.collection("parkingRecords").deleteMany({});
  await db.collection("lots").deleteMany({});
  await db.collection("operators").deleteMany({});
  await db.collection("rates").deleteMany({});

  await db.collection("parkingRecords").insertMany(parkingRecords);
  await db.collection("lots").insertMany(lots);
  await db.collection("operators").insertMany(operators);
  await db.collection("rates").insertMany(rates);

  console.log("Database seeded successfully");
  process.exit();
}

seed();