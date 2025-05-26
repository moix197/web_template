import { apiHandler } from "@moix197/next-ui";
import { basicModels } from "@/data/models/models";
import { addItemToDb } from "@moix197/db";

async function create(req: Request): Promise<any> {
	const body = await req.json();
	const insertItem = await addItemToDb({
		category: body.category,
		data: body.data,
		models: basicModels,
	});

	return {
		message: `New ${body.category} item created successfully`,
		value: insertItem,
	};
}

export const POST = apiHandler({ POST: create });
