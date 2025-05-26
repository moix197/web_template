import { apiHandler } from "@moix197/next-ui";
import { createFolder } from "@moix197/file_explorer";
import { basicModels } from "@/data/models/models";
import { setFileExplorerConfig } from "@moix197/file_explorer";

async function createFolderRoute(req: Request): Promise<any> {
	const body = await req.json();
	const { name, parentId, parentCategory, parentFolderId } = body;

	const fileSystemModel = basicModels["fileSystem"];
	setFileExplorerConfig({
		customFileSystemModel: fileSystemModel,
	});

	await createFolder({
		name,
		parentId,
		parentCategory,
		parentFolderId,
	});

	return {
		err: false,
		message: `Folder created successfully`,
		//value: `${baseImageRoutes[body.imageCat]}/${fileName}.jpg`,
	};
}

export const POST = apiHandler({ POST: createFolderRoute });
