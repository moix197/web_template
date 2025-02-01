import { NextResponse } from "next/server";
import createNewDbCollections from "@/utils/db/createNewDbCollections";
import { delay } from "@/utils/delay";
import { apiHandler } from "@/utils/api/handler";

async function doThis(req: Request): Promise<any> {
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
				value: "Airdrop created successfully",
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

export const GET = apiHandler({ GET: doThis });
