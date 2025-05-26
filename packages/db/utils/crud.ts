// Existing imports and connectToDatabase function...

import { connectToDatabase } from "./connection";

async function insertDocument(
	model: any,
	values: any,
	errorMessage = "We couldn't create the new entry on the DB, please try again later"
) {
	await connectToDatabase();
	const newDocument = await new model(values);
	const result = await newDocument.save();

	if (!result) {
		throw new Error(errorMessage);
	}
	return result;
}

//create a function that queries the database for documents with the same value I provide, if it does not exists it creates a new document
async function findOrCreateDocument(model: any, query: any, values: any) {
	await connectToDatabase();
	const findResult = await model.findOne(query);
	//now if document does not get a value, it means it does not exist, so we create a new document
	if (!findResult) {
		const newDocument = await new model(values);
		try {
			const insertedNewDocument = await newDocument.save();
			return insertedNewDocument;
		} catch (error) {
			return error;
		}
	}

	return findResult;
}
async function findDocuments(model: any, query = {}, sort = {}) {
	await connectToDatabase();
	const documents = await model.find(query);
	return documents;
}

async function updateDocument(
	model: any, // Mongoose model instead of collection name
	filter: any, // Query filter for the update
	update: any, // Fields to be updated
	customUpdateField = null, // Optionally, custom update fields
	session = null // Optional session for transactions
) {
	try {
		let updateField = { $set: update };

		// If customUpdateField is provided, use it instead of $set
		if (customUpdateField) {
			updateField = customUpdateField;
		}

		// Use Mongoose model to update
		const result = await model.updateOne(filter, updateField, { session });

		return result;
	} catch (error) {
		console.error("Error updating document:", error);
		throw error;
	}
}

async function insertMultipleDocuments(
	collectionName: any,
	givenItemsAry: any
) {
	const { db } = (await connectToDatabase()) as any;
	const collection = db.collection(collectionName);

	const result = await collection.insertMany(givenItemsAry);
	return result;
}

async function joinDocuments(collectionName: any, pipeline: any) {
	const { db } = (await connectToDatabase()) as any;
	const collection = db.collection(collectionName);
	const documents = await collection.aggregate(pipeline).toArray();
	return documents;
}

async function updateDocumentWithTransaction(values: any) {
	const { client, db } = (await connectToDatabase()) as any;
	const session = client.startSession();
	try {
		session.startTransaction({
			readConcern: { level: "snapshot" },
			writeConcern: { w: "majority" },
		});

		let resultAry = [];
		for (const item of values) {
			let result = await updateDocument(
				item.collection,
				item.filter,
				item.update,
				null,
				session
			);

			if (!result || result.modifiedCount == 0) {
				throw new Error("We couldn't update the fields");
			}
			resultAry.push(result);
		}

		await session.commitTransaction();
		session.endSession();
		return {
			err: false,
		};
	} catch (error) {
		await session.abortTransaction();
		session.endSession();

		return {
			err: true,
			error: error,
		};
	}
}

async function deleteDocument(collectionName: any, filter: any) {
	const { db, client } = (await connectToDatabase()) as any;
	const collection = db.collection(collectionName);
	const result = await collection.deleteOne(filter);
	await client.close();
	return result;
}

export {
	insertDocument,
	insertMultipleDocuments,
	findDocuments,
	joinDocuments,
	updateDocument,
	deleteDocument,
	updateDocumentWithTransaction,
	findOrCreateDocument,
};
