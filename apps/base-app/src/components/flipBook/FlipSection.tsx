"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import BookContent from "./BookContent";
import BookCover from "./BookCover";

export default function FlipSection({
	pages = [],
	className = "",
	pageClassName = "",
	width = 300,
	height = 500,
	bookCoverClassName = "",
}) {
	const [lastItemAdded, setLastItemAdded] = useState(false);
	const book = useRef();

	return (
		// @ts-ignore
		<HTMLFlipBook
			width={width}
			minWidth={300}
			height={height}
			ref={book}
			className={`${className} rounded-r-lg`}
			showCover={true}
			//usePortrait={true}
			//autoSize={true}
			size={"stretch"}
		>
			{pages?.length > 0 &&
				pages.map((item, index) => {
					return (
						<div key={`book_page_${index}`} className={`${pageClassName}`}>
							{item?.isBookCover ? (
								<BookCover
									title={item.title}
									content={item.content}
									bookCoverInner={item.bookCoverInner}
									className={bookCoverClassName}
								></BookCover>
							) : (
								<BookContent
									title={item.title}
									content={item.content}
									className={item.className}
									image={item.image}
								></BookContent>
							)}
						</div>
					);
				})}
		</HTMLFlipBook>
	);
}
