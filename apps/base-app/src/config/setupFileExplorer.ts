import { basicModels } from "@/data/models/models";
import { setFileExplorerConfig } from "@moix197/file_explorer";
import { initSupabaseClient } from "@moix197/filex_explorer/config";

function setupFileExplorer() {
	const fileSystemModel = basicModels["fileSystem"];

	setFileExplorerConfig({
		customFileSystemModel: fileSystemModel,
		enviroment: "supabase",
	});

	initSupabaseClient({
		url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
		anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	});
}

export { setupFileExplorer };
