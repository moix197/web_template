import { NextResponse } from "next/server";
import createNewDbCollections from "../../../base-app/utils/db/createNewDbCollections";
import { delay } from "../../../base-app/utils/delay";
import { apiHandler } from "../../../base-app/utils/api/handler";

async function createDbCollections(req: Request): Promise<any> {
	try {
		//const { searchParams } = new URL(req.url);

		let results = {
			createNewDbs: {},
		};

		let createNewDbs = await createNewDbCollections();
		await delay(1000);
		results.createNewDbs = createNewDbs;

		return {
			err: false,
			result: {
				value: "db created successfully",
				details: results,
			},
		};
	} catch (error) {
		return {
			err: true,
			error: error,
		};
	}
}

export const GET = apiHandler({ GET: createDbCollections });
