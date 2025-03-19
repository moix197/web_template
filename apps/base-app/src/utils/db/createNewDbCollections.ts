/*import { books } from "../../../src/db/schemas/books";
import { setupCollection } from "./setupCollection";
import { users } from "../../../src/db/schemas/users";
import { payments } from "../../../src/db/schemas/payments";
import { paymentMethods } from "../../../src/db/schemas/paymentMethods";
import { packages } from "../../../src/db/schemas/packages";

interface CollectionSchema {
	required: string[];
	properties: Record<string, object>;
	name: string;
	unique?: boolean; // Allow both array and boolean
	index?: Record<string, number> | boolean;
}

let collections: CollectionSchema[] = [
	users,
	books,
	payments,
	paymentMethods,
	packages,
];

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
				index: typeof element.index === "boolean" ? undefined : element.index,
				update: false, // NEVER CHANGE UNLESS YOU NEED |TO UPDATE A SCHEMA
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
