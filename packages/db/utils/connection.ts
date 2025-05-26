import mongoose from "mongoose";
import { getDatabaseConfig } from "../config";
// Mongoose connection singleton
let isConnected: boolean = false; // Track if Mongoose is connected

async function connectToDatabase() {
	try {
		const dbName = getDatabaseConfig(); // Get the database name from config
		const dbUri = process.env.DB_CONN_STRING as string;

		if (isConnected) {
			console.log(`Already connected to the database: ${dbName}`);
			return mongoose.connection;
		}

		// Use mongoose.connect with your connection string
		await mongoose.connect(dbUri as string, {
			dbName, // Specify the DB name
			bufferCommands: true, // This keeps Mongoose buffering enabled
			serverSelectionTimeoutMS: 30000, // Wait 30 seconds for server selection
		});

		isConnected = true; // Set the connection flag to true when connected
		console.log("Successfully connected to MongoDB");
		return mongoose.connection;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		const err = error as Error;
		throw new Error(err.message || "Couldn't connect to the database");
	}
}

export { connectToDatabase };
