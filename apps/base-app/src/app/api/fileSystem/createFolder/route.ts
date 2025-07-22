import { customApiHandler as apiHandler } from "@/lib/customApiHandler";
import { createFolder } from "@moix197/file_explorer";

async function createFolderRoute(req: Request): Promise<any> {
	const body = await req.json();
	const { name, parentId, parentCategory, parentFolderId } = body;

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
