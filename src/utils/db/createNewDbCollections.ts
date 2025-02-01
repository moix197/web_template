import { setupCollection } from "./setupCollection";
import { usersData } from "@/db/schemas/users";

interface CollectionSchema {
	required: string[];
	properties: Record<string, unknown>;
	name: string;
	unique?: boolean; // Allow both array and boolean
	index?: Record<string, number>;
}

let collections: CollectionSchema[] = [usersData];

async function createNewDbCollections(): Promise<
	{ err: boolean; value?: any[] } | string
> {
	try {
		let finalAry: any[] = [];

		for (const element of collections) {
			let unique: boolean | null | undefined = null;
			if (typeof element.unique === "boolean") {
				unique = element.unique;
			}

			let result = await setupCollection({
				required: element.required,
				properties: element.properties,
				name: element.name,
				unique: element.unique,
				index: element.index,
				update: false, // NEVER CHANGE UNLESS YOU NEED TO UPDATE A SCHEMA
			});

			finalAry.push(result);
		}
		return {
			err: false,
			value: finalAry,
		};
	} catch (error) {
		return "we couldn't finish the process, please try again later";
	}
}

export default createNewDbCollections;

//import { airdropsData } from "db/schemas/airdropsData";
/*import { setupCollection } from "./setupCollection";
import { usersData } from "@/db/schemas/users";

let collections = [usersData];

async function createNewDbCollections() {
	try {
		let finalAry = [];

		for (const element of collections) {
			let result = await setupCollection({
				required: element.required,
				properties: element.properties,
				name: element.name,
				unique: element.unique,
				index: element.index,
				update: false, //NEVER CHANGE UNLESS YOU NEED TO UPDATE AN SCHEMA
			});

			finalAry.push(result);
		}
		return {
			err: false,
			value: finalAry,
		};
	} catch (error) {
		return "we couldn't finish the process, please try again later";
	}
}

export default createNewDbCollections;*/
