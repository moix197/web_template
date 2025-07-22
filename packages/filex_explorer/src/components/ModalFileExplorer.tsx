"use client";

import { useEffect, useState } from "react";
import { FileExplorer } from "./FileExplorer";
import { TbArrowsExchange2 } from "react-icons/tb";
import { DrawerBasic, SolidButton } from "@moix197/base-ui";
import { Image } from "@moix197/next-ui";

interface ModalFileExplorerProps {
	value?: string;
	setValue: (value: string) => void;
	showImageSet?: boolean;
	isOpenModal: boolean;
	setIsOpenModal?: (isOpenModal: boolean) => void;
	imageCategory: string;
	useItemIdAsImageParent: boolean;
}

const ModalFileExplorer = ({
	value,
	setValue,
	showImageSet,
	isOpenModal,
	setIsOpenModal,
	imageCategory,
	useItemIdAsImageParent,
}: ModalFileExplorerProps) => {
	const [isOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		isOpenModal && setIsModalOpen(true);
	}, [isOpenModal]);

	function closeModal() {
		setIsModalOpen(false);
		setIsOpenModal && setIsOpenModal(false);
	}

	return (
		<div>
			{showImageSet && !isOpenModal && (
				<div>
					{!value ? (
						<div className="flex">
							<SolidButton onClick={() => setIsModalOpen(true)}>
								Select or Upload image
							</SolidButton>
						</div>
					) : (
						<div className="flex gap-8 items-center">
							<div>
								<Image
									width={100}
									height={100}
									src={`${value}`}
									alt="oka"
								></Image>
							</div>
							<div>
								<SolidButton onClick={() => setIsModalOpen(true)}>
									<span>change image</span>
									<TbArrowsExchange2 className="ml-2 h-4 w-4"></TbArrowsExchange2>
								</SolidButton>
							</div>
						</div>
					)}
				</div>
			)}

			<DrawerBasic
				title="File Explorer"
				setOpenDrawer={() => {
					closeModal();
				}}
				openDrawer={isOpen}
				position="bottom"
				className="h-auto border-t border-third color-white max-h-[80vh] "
			>
				{isOpen && (
					<FileExplorer
						setIsModalOpen={() => {
							closeModal();
						}}
						setValue={setValue}
						imageCategory={imageCategory}
						useItemIdAsImageParent={useItemIdAsImageParent}
					></FileExplorer>
				)}
			</DrawerBasic>
		</div>
	);
};

export { ModalFileExplorer };
