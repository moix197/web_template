import { apiHandler } from "@moix197/next-ui";
import { basicModels } from "@/data/models/models";
import { getDataFromDb } from "@moix197/db";

async function getDataRoute(req: Request): Promise<any> {
	const { searchParams } = new URL(req.url);
	const paramsObject = Object.fromEntries(searchParams.entries());
	const { category, data } = paramsObject;

	const dataFromDb = await getDataFromDb({
		category,
		data,
		models: basicModels,
	});

	return {
		result: {
			message: `${paramsObject.category} data retrieved successfully`,
			value: dataFromDb,
		},
	};
}

export const GET = apiHandler({ GET: getDataRoute });
