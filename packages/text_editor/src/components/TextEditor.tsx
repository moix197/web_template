"use client";
import React, { useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import BlotFormatter from "quill-blot-formatter";
import "react-quill/dist/quill.snow.css";
import { ModalFileExplorer } from "@moix197/file_explorer/client";

Quill.register("modules/blotFormatter", BlotFormatter);

function TextEditor({
	value,
	setValue,
	imageCategory,
	useItemIdAsImageParent,
}) {
	//const [value, setValue] = useState("");
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [imageValue, setImageValue] = useState("");
	const [quillInstance, setQuillInstance] = useState(null);

	useEffect(() => {
		if (imageValue != "") {
			quillInstance?.insertEmbed(10, "image", `/uploads/${imageValue}`);
			setIsOpenModal(false);
		}
	}, [imageValue, quillInstance]);

	useEffect(() => {});

	const modules = useMemo(
		() => ({
			clipboard: true,
			toolbar: {
				container: [
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					["bold", "italic", "underline", "strike", "blockquote"],
					[{ align: ["right", "center", "justify"] }],
					[{ color: [] }, { background: [] }],
					[{ list: "ordered" }, { list: "bullet" }],
					["link", "video", "image", "formula"],
				],
				handlers: {
					image: function (e) {
						if (!quillInstance) {
							setQuillInstance(this?.quill);
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
					className="book-aspect-ratio w-[600px] max-w-full"
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
