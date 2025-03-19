import { apiHandler } from "@/utils/api/handler";
import { rename } from "@base/file_explorer";
import { basicModels } from "@/data/models/models";
import { setFileExplorerConfig } from "@base/file_explorer";

async function renameItem(req: Request): Promise<any> {
	try {
		const body = await req.json();
		const { id, newName } = body;

		const fileSystemModel = basicModels["fileSystem"];
		setFileExplorerConfig({
			customFileSystemModel: fileSystemModel,
		});

		await rename({ newName, id });

		return {
			err: false,
			message: `Renamed successfully`,
			//value: `${baseImageRoutes[body.imageCat]}/${fileName}.jpg`,
		};
	} catch (error) {
		return {
			err: true,
			message: error.message
				? error.message
				: "An error occurred, please try again later",
			error: error,
		};
	}
}

export const POST = apiHandler({ POST: renameItem });
