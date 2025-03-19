import { setFileExplorerConfig, uploadFile } from "@base/file_explorer";
import { apiHandler } from "@/utils/api/handler";
import { basicModels } from "@/data/models/models";

async function uploadFileRoute(req: Request): Promise<any> {
	try {
		const formData = await req.formData();
		const body = Object.fromEntries(formData);
		const file = body.file;
		const { parentId, imageCategory, parentFolderId } = body;

		const fileSystemModel = basicModels["fileSystem"];
		setFileExplorerConfig({
			customFileSystemModel: fileSystemModel,
		});

		await uploadFile({ file, parentId, imageCategory, parentFolderId });

		return {
			err: false,
			message: `Image uploaded successfully`,
			//value: `${baseImageRoutes[body.imageCat]}/${fileName}.jpg`,
		};
	} catch (error: any) {
		console.log("error", error);
		return {
			err: true,
			message: error.message
				? error.message
				: "An error occurred, please try again later",
			error: error,
		};
	}
}

export const POST = apiHandler({ POST: uploadFileRoute });
