import { apiHandler } from "../../../base-app/utils/api/handler";
import { updateDocument } from "../../../base-app/utils/db/crud";
import { ObjectId } from "mongodb";
import { basicModels } from "../../data/models/models";

async function create(req: Request): Promise<any> {
	try {
		const body = await req.json();

		const updatedItem = await updateDocument(
			basicModels[body.category],
			{ _id: new ObjectId(body.id) },
			body.data
		);

		if (!updatedItem) {
			throw new Error(`We couldn't update the document`);
		}

		return {
			err: false,
			message: `${body.category} item UPDATED successfully`,
			//value: insertItem,
		};
	} catch (error) {
		console.log("error", error);
		return {
			err: true,
			message: error.message
				? error.message
				: "An error occurred, please try again later",
			error: error,
		};
	}
}

export const POST = apiHandler({ POST: create });
