import { apiHandler } from "@moix197/next-ui";
import { rename } from "@moix197/file_explorer";
import { basicModels } from "@/data/models/models";
import { setFileExplorerConfig } from "@moix197/file_explorer";

async function renameItem(req: Request): Promise<any> {
	const body = await req.json();
	const { id, newName } = body;

	const fileSystemModel = basicModels["fileSystem"];
	setFileExplorerConfig({
		customFileSystemModel: fileSystemModel,
	});

	await rename({ newName, id });

	return {
		message: `Renamed successfully`,
		//value: `${baseImageRoutes[body.imageCat]}/${fileName}.jpg`,
	};
}

export const POST = apiHandler({ POST: renameItem });
