import mongoose from "mongoose";

const dbName = "wedding_db"; // Name of your MongoDB database

// Mongoose connection singleton
let isConnected: boolean = false; // Track if Mongoose is connected

async function connectToDatabase(): Promise<void> {
	if (isConnected) {
		console.log("Already connected to the database.");
		return; // Return early if already connected
	}

	try {
		// Use mongoose.connect with your connection string
		await mongoose.connect(process.env.DB_CONN_STRING as string, {
			dbName, // Specify the DB name
			useNewUrlParser: true,
			useUnifiedTopology: true,
			bufferCommands: true, // This keeps Mongoose buffering enabled
			bufferTimeoutMS: 30000, // Timeout in milliseconds (30 seconds here)
			serverSelectionTimeoutMS: 30000, // Wait 30 seconds for server selection
		});

		isConnected = true; // Set the connection flag to true when connected
		console.log("Successfully connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw new Error("Failed to connect to MongoDB.");
	}
}

export { connectToDatabase };

/*import { MongoClient, Db } from "mongodb";

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

export { connectToDatabase };*/
