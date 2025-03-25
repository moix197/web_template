"use client";

import { useState } from "react";

const Form = () => {
	const [name, setName] = useState("");
	const [pagesContent, setPagesContent] = useState([]);
	const [paymentId, setPaymentId] = useState("");
	const [isActive, setIsActive] = useState(true);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const payload = { name, pagesContent, paymentId, isActive };

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
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			{/* Add input fields for pagesContent */}
			<button type="submit">Save</button>
		</form>
	);
};

export default Form;
