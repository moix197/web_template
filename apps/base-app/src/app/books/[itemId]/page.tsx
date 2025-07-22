"use client";

import { FlipSection } from "@moix197/book";
import { getCall, SectionLayout } from "@moix197/base-ui";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Home() {
	const [pagesContent, setPagesContent] = useState([]);
	const { itemId } = useParams() as {
		itemId: string;
	};
	useEffect(() => {
		getPagesData();
	}, []);

	async function getPagesData() {
		const response = await getCall("/api/getData", {
			category: "books",
			data: JSON.stringify({ _id: itemId /*"67c8d0a1ccf83bfab23dc573"*/ }),
		});

		if (response?.result?.value) {
			setPagesContent(response.result.value[0].pages);
		}
	}

	return (
		<>
			<SectionLayout className="w-full !p-0 min-h-screen">
				{/*<div className="text-center mb-8">
						<TitleXl>Esto es un titulo</TitleXl>
					</div>*/}
				<FlipSection
					pages={pagesContent}
					className=""
					pageClassName={"bg-transparent text-black shadow-2xl drop-shadow-2xl"}
					bookCoverClassName=""
				></FlipSection>
			</SectionLayout>
		</>
	);
}
