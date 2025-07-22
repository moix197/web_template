import { customApiHandler as apiHandler } from "@/lib/customApiHandler";
import { rename } from "@moix197/file_explorer";

async function renameItem(req: Request): Promise<any> {
	const body = await req.json();
	const { id, newName } = body;

	await rename({ newName, id });

	return {
		message: `Renamed successfully`,
		//value: `${baseImageRoutes[body.imageCat]}/${fileName}.jpg`,
	};
}

export const POST = apiHandler({ POST: renameItem });
