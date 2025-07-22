import { useEffect, useState } from "react";
import { FileManager } from "@moix197/cubone-explorer";
import { useNotifications } from "@moix197/notifications";
import { getCall, postCall } from "@moix197/base-ui";
import { usePathname } from "@moix197/next-ui";
import React from "react";

interface FileExplorerProps {
	initialPath?: string;
	isFormSelection?: boolean;
	setValue: (value: string) => void;
	setIsModalOpen: (isModalOpen?: boolean) => void;
	imageCategory: string;
	useItemIdAsImageParent: boolean;
}

function FileExplorer({
	initialPath,
	isFormSelection = false,
	setValue,
	setIsModalOpen,
	imageCategory,
	useItemIdAsImageParent,
}: FileExplorerProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [layout, setLayout] = useState("grid");
	const { showNotification } = useNotifications();
	const [files, setFiles] = useState([]);
	const path = usePathname();
	//useDashboardData("fileSystem", setFiles, null, null);
	useEffect(() => {
		loadContentData();
	}, []);

	async function loadContentData() {
		setIsLoading(true);
		const newValObj = {
			rootName: useItemIdAsImageParent
				? getParentFolderIdFromURL()
				: imageCategory,
		};

		const data = await getCall("/api/getData", {
			category: "fileSystem",
			data: JSON.stringify(newValObj),
		});

		data?.result?.value?.push({
			name: imageCategory,
			isDirectory: true,
			path: imageCategory,
		});

		if (useItemIdAsImageParent) {
			data?.result?.value?.push({
				name: getParentFolderIdFromURL(),
				isDirectory: true,
				path: `${imageCategory}/${getParentFolderIdFromURL()}`,
			});
		}

		setFiles(data?.result?.value);
		setIsLoading(false);
	}

	const fileUploadConfigUrl = {
		url: "/api/upload",
	};

	function getParentFolderIdFromURL() {
		if (!useItemIdAsImageParent) return null;
		const parentFolderId = path.split("/");
		return parentFolderId[parentFolderId?.length - 1];
	}

	const handleFileUploading = (file: any, parentFolder: any) => {
		const parentFolderId = getParentFolderIdFromURL();
		return {
			imageCategory,
			parentFolderId,
			parentId: parentFolder?._id,
		};
	};

	const handleCreateFolder = async (name: any, parentFolder: any) => {
		setIsLoading(true);
		const parentFolderId = getParentFolderIdFromURL();

		const result = await postCall("/api/fileSystem/createFolder", {
			name: name,
			parentId: parentFolder?._id,
			parentCategory: imageCategory,
			parentFolderId: parentFolderId,
		});

		showNotification(result);
		setIsLoading(false);
		loadContentData();
	};

	function handleLayoutChange() {
		setLayout(layout == "grid" ? "list" : "grid");
	}

	async function handleFileUploaded(response: any) {
		const result = JSON.parse(response);
		showNotification(result);
		loadContentData();
	}

	async function handleRename(item: any, newName: any) {
		const result = await postCall("/api/fileSystem/renameItem", {
			newName,
			id: item?._id,
		});
		showNotification(result);
	}

	function confirmSelectionAndReturnValue(selectedValue: any) {
		if (selectedValue[0].isDirectory) return;
		if (confirm("Do you want to use this image?")) {
			setValue(
				`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${selectedValue[0].path}`
			);
			setIsModalOpen(false);
		}
	}
	return (
		<>
			<div>
				<FileManager
					fileUploadConfig={fileUploadConfigUrl}
					onRefresh={loadContentData}
					files={files}
					isLoading={isLoading}
					initialPath={`/${imageCategory}/`}
					enableFilePreview
					filePreviewPath={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${imageCategory}`}
					onCreateFolder={handleCreateFolder}
					// @ts-ignore
					onFileUploading={handleFileUploading}
					// @ts-ignore
					onFileUploaded={handleFileUploaded}
					onLayoutChange={handleLayoutChange}
					onRename={handleRename}
					onSelect={confirmSelectionAndReturnValue}
				/>
			</div>
		</>
	);
}

export { FileExplorer };
