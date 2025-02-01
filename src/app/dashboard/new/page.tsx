"use client";

import React, { useState } from "react";

interface PageContent {
	title: string;
	isBookCover?: boolean;
	bookCoverInner?: boolean;
	content?: string;
	image?: {
		src: string;
		alt: string;
	};
}

const PageManagerForm = () => {
	const [name, setName] = useState("");
	const [paymentId, setPaymentId] = useState("");
	const [isActive, setIsActive] = useState(true);

	const [pages, setPages] = useState<PageContent[]>([
		{ title: "Emily & Jack", isBookCover: true },
		{ title: "Inside Cover", isBookCover: true, bookCoverInner: true },
	]);

	const handleChange = (index: number, field: string, value: any) => {
		const updatedPages = [...pages];
		updatedPages[index] = { ...updatedPages[index], [field]: value };

		// Enforce constraints on the first and second objects
		/*if (index === 0 && field === "isBookCover" && value === false) {
			updatedPages[index].isBookCover = true;
		}
		if (index === 1 && field === "bookCoverInner" && value === false) {
			updatedPages[index].bookCoverInner = true;
		}*/

		setPages(updatedPages);
	};

	const addPage = () => {
		setPages([
			...pages,
			{
				title: "",
			},
		]);
	};

	const removePage = (index: number) => {
		if (index > 1) {
			setPages(pages.filter((_, i) => i !== index));
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const payload = {
			name,
			pagesContent: pages,
			paymentId,
			isActive,
		};

		try {
			const response = await fetch("/api/pages", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (response.ok) {
				alert("Page saved successfully!");
			} else {
				alert(`Error: ${data.error}`);
			}
		} catch (err) {
			console.error(err);
			alert("Failed to save page");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<label className="block font-bold">Name:</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					className="border p-2 w-full"
					placeholder="Enter the name"
				/>
			</div>

			<div className="space-y-2">
				<label className="block font-bold">Payment ID:</label>
				<input
					type="text"
					value={paymentId}
					onChange={(e) => setPaymentId(e.target.value)}
					className="border p-2 w-full"
					placeholder="Enter payment ID"
				/>
			</div>

			<div className="space-y-2">
				<label className="block font-bold">Active:</label>
				<input
					type="checkbox"
					checked={isActive}
					onChange={(e) => setIsActive(e.target.checked)}
				/>
			</div>

			{pages.map((page, index) => (
				<div key={index} className="border p-4 rounded-md space-y-2">
					<div>
						<label className="block font-bold">Title:</label>
						<input
							type="text"
							value={page.title}
							onChange={(e) => handleChange(index, "title", e.target.value)}
							required={index < 2}
							className="border p-2 w-full"
							placeholder={index < 2 ? "Required" : "Optional"}
						/>
					</div>
					{index === 0 ? (
						<div>
							<label className="block font-bold">Is Book Cover:</label>
							<input
								type="checkbox"
								checked={!!page.isBookCover}
								onChange={(e) =>
									handleChange(index, "isBookCover", e.target.checked)
								}
								disabled={index === 0}
							/>
						</div>
					) : null}
					{index === 1 ? (
						<div>
							<label className="block font-bold">Book Cover Inner:</label>
							<input
								type="checkbox"
								checked={!!page.bookCoverInner}
								onChange={(e) =>
									handleChange(index, "bookCoverInner", e.target.checked)
								}
							/>
						</div>
					) : null}
					{index > 1 && (
						<>
							<div>
								<label className="block font-bold">Content:</label>
								<textarea
									value={page.content || ""}
									onChange={(e) =>
										handleChange(index, "content", e.target.value)
									}
									className="border p-2 w-full"
									placeholder="Optional content..."
								/>
							</div>
							<div>
								<label className="block font-bold">Image:</label>
								<input
									type="text"
									value={page.image?.src || ""}
									onChange={(e) =>
										handleChange(index, "image", {
											...page.image,
											src: e.target.value,
										})
									}
									className="border p-2 w-full"
									placeholder="Image source..."
								/>
								<input
									type="text"
									value={page.image?.alt || ""}
									onChange={(e) =>
										handleChange(index, "image", {
											...page.image,
											alt: e.target.value,
										})
									}
									className="border p-2 w-full mt-2"
									placeholder="Image alt text..."
								/>
							</div>
							<button
								type="button"
								onClick={() => removePage(index)}
								className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
							>
								Remove Page
							</button>
						</>
					)}
				</div>
			))}

			<div>
				<button
					type="button"
					onClick={addPage}
					className="bg-blue-500 text-white px-4 py-2 rounded-md"
				>
					Add New Page
				</button>
			</div>

			<div>
				<button
					type="submit"
					className="bg-green-500 text-white px-4 py-2 rounded-md"
				>
					Save Page Data
				</button>
			</div>
		</form>
	);
};

export default PageManagerForm;
