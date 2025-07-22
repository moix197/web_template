import { customApiHandler as apiHandler } from "@/lib/customApiHandler";
import { basicModels } from "@/data/models/models";
import { addItemToDb } from "@moix197/db";

interface CreateRequestBody {
	category: string;
	data: Record<string, unknown>;
}

interface CreateResponse {
	message: string;
	value: {
		_id: string;
		[key: string]: unknown;
	};
}

async function create(req: Request): Promise<CreateResponse> {
	const body = (await req.json()) as CreateRequestBody;
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
