"use client";
import React, { useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import BlotFormatter from "quill-blot-formatter";
import "react-quill-new/dist/quill.snow.css";
import { ModalFileExplorer } from "@moix197/file_explorer/client";

Quill.register("modules/blotFormatter", BlotFormatter);
//TODO fix duplicated toolbar and sometimes not showing at all

interface TextEditorProps {
	value: string;
	setValue: (value: string) => void;
	imageCategory: string;
	useItemIdAsImageParent: boolean;
	className?: string;
}

function TextEditor({
	value,
	setValue,
	imageCategory,
	useItemIdAsImageParent,
	className = "",
}: TextEditorProps) {
	//const [value, setValue] = useState("");
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [imageValue, setImageValue] = useState("");
	const [quillInstance, setQuillInstance] = useState<any>(null);
	const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL!;

	useEffect(() => {
		if (imageValue != "") {
			console.log("imageValue", imageValue);
			quillInstance?.insertEmbed(10, "image", imageValue);
			setIsOpenModal(false);
		}
	}, [imageValue, quillInstance]);

	useEffect(() => {});

	const modules = useMemo(
		() => ({
			clipboard: true,
			toolbar: {
				container: [
					//[{ font: [] }],
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					["bold", "italic", "underline", "strike", "blockquote"],
					[
						{ align: "left" },
						{ align: "center" },
						{ align: "right" },
						{ align: "justify" },
					],
					[{ color: [] }, { background: [] }],
					[{ list: "ordered" }, { list: "bullet" }],
					["link", "video", "image", "formula"],
				],
				handlers: {
					image: function (e: any) {
						const that: any = this;
						if (!quillInstance) {
							setQuillInstance(that?.quill);
						}
						setIsOpenModal(true);
					},
				},
			},

			blotFormatter: {
				// see config options below
				overlay: {
					style: {
						border: "2px solid red",
					},
				},
			},
		}),
		[]
	); // Empty dependency array means this will be created once and never change

	return (
		<div>
			<div className="w-full flex">
				<ReactQuill
					theme="snow"
					value={value}
					modules={modules}
					onChange={setValue}
					className={`aspect-[3/4] w-[430px] max-w-full bg-white ${className}`}
				/>
			</div>
			<ModalFileExplorer
				isOpenModal={isOpenModal}
				setIsOpenModal={setIsOpenModal}
				setValue={setImageValue}
				imageCategory={imageCategory}
				useItemIdAsImageParent={useItemIdAsImageParent}
			></ModalFileExplorer>
		</div>
	);
}

export { TextEditor };
