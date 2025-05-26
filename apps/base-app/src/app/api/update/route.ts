import { apiHandler } from "@moix197/next-ui";
import { basicModels } from "@/data/models/models";
import { updateItemFromDb } from "@moix197/db";

async function updateDataRoute(req: Request): Promise<any> {
	const body = await req.json();

	await updateItemFromDb({
		id: body.id,
		category: body.category,
		data: body.data,
		models: basicModels,
	});

	return {
		message: `${body.category} item UPDATED successfully`,
		//value: insertItem,
	};
}

export const POST = apiHandler({ POST: updateDataRoute });
