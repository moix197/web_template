"use client";

import { postCall } from "../../services/apiSkeletons/calls";
import { FileInput, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SolidButton } from "../buttons/Buttons";
import { TbArrowsExchange2 } from "react-icons/tb";
import useNotifications from "../../Hooks/useNotifications";

export function FileUploadInput({ value, setValue, imageCat, label = null }) {
	const [error, setError] = useState();
	const [showForm, setShowForm] = useState(false);

	const { showNotification } = useNotifications();

	async function handleChange(e) {
		if (e.target.files) {
			const formData = new FormData();

			Object.values(e.target.files).forEach((file) => {
				formData.append("file", file);
			});

			formData.append("imageCat", imageCat);

			const result = await postCall("/api/upload", formData, "file", {});

			showNotification(result);

			if (!result.err) setValue(result.value);
		}
	}

	useEffect(() => {
		if (value) setShowForm(false);
	}, [value]);

	return (
		<div>
			{label && (
				<div className="label uppercase ">
					<Label className="text-secondary" htmlFor="multiple-file-upload">
						{label}
					</Label>
				</div>
			)}
			{!showForm ? (
				<div className="flex gap-4 items-center">
					<Image src={value} width="100" height="100"></Image>
					<SolidButton onClick={() => setShowForm(true)}>
						<span>change image</span>
						<TbArrowsExchange2 className="ml-2 h-4 w-4"></TbArrowsExchange2>
					</SolidButton>
				</div>
			) : (
				<div>
					<FileInput
						onChange={handleChange}
						id="multiple-file-upload"
						multiple
					/>
					<div className="label pb-0 pt-1 justify-center">
						<span className="label-text-alt text-red-400 text-[10px] h-2">
							{` ${error ? error : ""}`}
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
