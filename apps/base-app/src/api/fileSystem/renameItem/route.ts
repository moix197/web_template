import { apiHandler } from "../../../../base-app/utils/api/handler";
import fs from "fs";
import FileSystemModel from "../../../data/models/FileSystem.model";
import { getRelatedPaths } from "../../../../base-app/utils/fileSystem/helpers";

const updateChildernPathRecursive = async (item) => {
	const children = await FileSystemModel.find({ parentId: item._id });

	for (const child of children) {
		child.path = `${item.path}/${child.name}`;
		await child.save({ timestamps: false });

		if (child.isDirectory) updateChildernPathRecursive(child);
	}
};

async function renameItem(req: Request): Promise<any> {
	try {
		const body = await req.json();
		const { id, newName } = body;
		const item = await FileSystemModel.findById(id);

		if (!item) {
			throw new Error(
				"We couldn't proceed with the update, please try again later"
			);
		}

		let { itemPath, fullItemPath } = await getRelatedPaths(
			item.parentId,
			newName
		);
		const newItemPath = itemPath;
		const newItemFullPath = fullItemPath;

		const oldPaths = await getRelatedPaths(item.parentId, item.name);
		const oldFullPath = oldPaths.fullItemPath;

		if (fs.existsSync(newItemFullPath)) {
			throw new Error("A file or folder with that name already exists!");
		}

		await fs.promises.rename(oldFullPath, newItemFullPath);

		item.name = newName;
		item.path = newItemPath;

		await item.save();

		if (item.isDirectory) {
			await updateChildernPathRecursive(item);
		}

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
