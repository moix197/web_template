import { findDocuments, insertDocument, updateDocument } from "../utils/crud";
import { transformObjectIds } from "../utils/helpers";
import { ObjectId } from "mongodb";

interface GetDataFromDbProps {
	category: string;
	data: any;
	models: any;
}

async function getDataFromDb({ category, data, models }: GetDataFromDbProps) {
	let filter = {};
	if (data) {
		filter = typeof data === "string" ? JSON.parse(data) : data;
		transformObjectIds(filter);
	}

	const dataFromDb = await findDocuments(models[category], filter);

	if (!dataFromDb) {
		throw new Error("We couldn't get the data, please try again later");
	}

	return dataFromDb;
}

interface UpdateItemFromDbProps {
	id: string;
	category: string;
	data: any;
	models: any;
}
async function updateItemFromDb({
	id,
	category,
	data,
	models,
}: UpdateItemFromDbProps) {
	const updatedItem = await updateDocument(
		models[category],
		{ _id: new ObjectId(id) },
		data
	);
	if (!updatedItem) {
		throw new Error(`We couldn't update the document`);
	}
}

interface AddItemToDbProps {
	category: string;
	data: any;
	models: any;
}
async function addItemToDb({ category, data, models }: AddItemToDbProps) {
	const insertItem = await insertDocument(models[category], data);

	if (!insertItem) {
		throw new Error("Failed to create the item.");
	}

	return insertItem;
}

export { getDataFromDb, updateItemFromDb, addItemToDb };
