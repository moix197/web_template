import { apiHandler } from "../../../base-app/utils/api/handler";
import { findDocuments } from "../../../base-app/utils/db/crud";
import { ObjectId } from "mongodb";
import { basicModels } from "../../data/models/models";

function transformObjectIds(obj: any): void {
	const objectIdRegex = /^[0-9a-fA-F]{24}$/;

	for (const key in obj) {
		if (typeof obj[key] === "string" && objectIdRegex.test(obj[key])) {
			obj[key] = new ObjectId(obj[key]);
		} else if (
			obj[key] &&
			typeof obj[key] === "object" &&
			!Array.isArray(obj[key])
		) {
			transformObjectIds(obj[key]);
		}
	}
}

async function getData(req: Request): Promise<any> {
	try {
		const { searchParams } = new URL(req.url);
		const paramsObject = Object.fromEntries(searchParams.entries());
		const { category, data } = paramsObject;

		console.log("category", category);
		console.log("data", data);
		/*console.log("paramsObject", paramsObject);
		let dataFromDb = await findDocuments(
			basicModels[category],
			//paramsObject.data ? { _id: new ObjectId(paramsObject.itemId) } : {}
			data ? { ...data } : {}
		);*/

		let filter = {};
		if (data) {
			filter = typeof data === "string" ? JSON.parse(data) : data;
			transformObjectIds(filter);
		}

		const dataFromDb = await findDocuments(basicModels[category], filter);

		if (!dataFromDb) {
			throw new Error("We couldn't get the data, please try again later");
		}

		return {
			err: false,
			result: {
				message: `${paramsObject.category} data retrieved successfully`,
				value: dataFromDb,
			},
		};
	} catch (error) {
		console.log("error", error);
		return {
			err: true,
			error: error,
		};
	}
}

export const GET = apiHandler({ GET: getData });
