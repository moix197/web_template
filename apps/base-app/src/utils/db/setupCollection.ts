import { connectToDatabase } from "../../../src/db/conn/db";

interface SetupCollectionParams {
	required: string[];
	properties: Record<string, unknown>;
	name: string;
	index?: Record<string, number> | null;
	unique?: boolean | null | undefined;
	update?: boolean;
}

interface SetupCollectionResponse {
	err: boolean;
	message: string;
	def?: unknown;
}

async function setupCollection({
	required,
	properties,
	name,
	index = null,
	unique = null,
	update = false,
}: SetupCollectionParams): Promise<SetupCollectionResponse> {
	try {
		const { db } = await connectToDatabase();
		// Check if the collection already exists
		const collections = await db.collections();
		const collectionExists = collections.some(
			(collection) => collection.collectionName === name
		);

		if (!collectionExists) {
			// Define collection schema and validation options
			const collectionOptions = {
				validator: {
					$jsonSchema: {
						bsonType: "object",
						required,
						properties,
					},
				},
			};

			// Create the collection with schema validation enabled
			await db.createCollection(name, collectionOptions);
			if (index) {
				await db
					.collection(name)
					.createIndex(index, { unique: unique ?? false });
			}
			return {
				err: false,
				message: `Collection ${name} created successfully in DB`,
			};
		}

		if (collectionExists && update) {
			await db.command({
				collMod: name,
				validator: {
					$jsonSchema: {
						bsonType: "object",
						required,
						properties,
					},
				},
				validationAction: "error", // or "warn" to allow existing data that doesn't match the new schema
			});

			return {
				err: false,
				message: `Collection ${name} updated successfully in DB`,
			};
		}

		return {
			err: true,
			message: `Collection ${name} already exists in the DB`,
		};
	} catch (error) {
		return {
			err: true,
			message: `An error occurred while processing collection ${name}`,
			def: error,
		};
	}
}

export { setupCollection };
