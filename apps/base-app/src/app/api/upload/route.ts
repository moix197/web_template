import { setFileExplorerConfig, uploadFile } from "@moix197/file_explorer";
import { apiHandler } from "@moix197/next-ui";
import { basicModels } from "@/data/models/models";

async function uploadFileRoute(req: Request): Promise<any> {
	const formData = await req.formData();
	const body = Object.fromEntries(formData);
	const file = body.file;
	const { parentId, imageCategory, parentFolderId } = body;

	const fileSystemModel = basicModels["fileSystem"];
	setFileExplorerConfig({
		customFileSystemModel: fileSystemModel,
	});

	await uploadFile({
		file: file as File,
		parentId: parentId as string,
		imageCategory: imageCategory as string,
		parentFolderId: parentFolderId as string,
	});

	return {
		message: `Image uploaded successfully`,
		//value: `${baseImageRoutes[body.imageCat]}/${fileName}.jpg`,
	};
}

export const POST = apiHandler({ POST: uploadFileRoute });
