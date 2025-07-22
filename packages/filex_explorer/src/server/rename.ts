import {
	renameLocal,
	renameSupabase,
	updateChildrenPathRecursive,
} from "../utils/helpers";
import { getFileExplorerConfig } from "../../config";

interface RenameProps {
	newName: string;
	id: string;
}

async function rename({ newName, id }: RenameProps): Promise<void> {
	const { fileSystemModel, enviroment } = getFileExplorerConfig();

	const item = await fileSystemModel?.findById(id);
	if (!item) {
		throw new Error(
			"We couldn't proceed with the update, please try again later"
		);
	}

	let newItemPath: string;

	if (enviroment === "supabase") {
		newItemPath = await renameSupabase(item, newName);
	} else {
		newItemPath = await renameLocal(item, newName);
	}

	item.name = newName;
	item.path = newItemPath;

	await item.save();

	if (item.isDirectory) {
		await updateChildrenPathRecursive(item);
	}
}

/*async function rename({ newName, id }: RenameProps) {
	const { fileSystemModel, enviroment } = getFileExplorerConfig() as any;

	const item = await fileSystemModel?.findById(id);

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

	const result = await item.save();

	if (item.isDirectory) {
		await updateChildrenPathRecursive(item);
	}
}*/

export { rename };
