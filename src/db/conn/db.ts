// utils/db.js
//const uri = "mongodb://Admin:%4019721562aA@109.123.250.102:27017/"; // MongoDB URI

//const uri = "mongodb://Admin:%4019721562aA@localhost:27017"; // MongoDB URI
//const uri = "mongodb://localhost:27017";

import { MongoClient, Db } from "mongodb";

const dbName = "wedding_db"; // Name of your MongoDB database

let client: MongoClient | null = null;

interface DbConnection {
	db: Db;
	client: MongoClient;
}

async function connectToDatabase(): Promise<DbConnection> {
	if (!client) {
		client = new MongoClient(process.env.DB_CONN_STRING as string, {});
		await client.connect();
	}
	return { db: client.db(dbName), client: client };
}

export { connectToDatabase };
