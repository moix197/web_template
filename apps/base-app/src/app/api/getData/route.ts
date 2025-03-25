import { apiHandler } from "@base/next-ui";
import { basicModels } from "@/data/models/models";
import { getDataFromDb } from "@base/db";

async function getDataRoute(req: Request): Promise<any> {
	try {
		const { searchParams } = new URL(req.url);
		const paramsObject = Object.fromEntries(searchParams.entries());
		const { category, data } = paramsObject;

		const dataFromDb = await getDataFromDb({
			category,
			data,
			models: basicModels,
		});

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

export const GET = apiHandler({ GET: getDataRoute });
