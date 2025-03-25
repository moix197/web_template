import { apiHandler } from "@moix197/next-ui";
import { basicModels } from "@/data/models/models";
import { updateItemFromDb } from "@moix197/db";

async function updateDataRoute(req: Request): Promise<any> {
	try {
		const body = await req.json();

		await updateItemFromDb({
			id: body.id,
			category: body.category,
			data: body.data,
			models: basicModels,
		});

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

export const POST = apiHandler({ POST: updateDataRoute });
