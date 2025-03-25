"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { BookContent } from "./BookContent";
import { BookCover } from "./BookCover";
import { BookActivationLayer } from "./BookActivationLayer";

function FlipSection({
	pages = [],
	className = "",
	pageClassName = "",
	width = 300,
	height = 500,
	bookCoverClassName = "",
}) {
	const [lastItemAdded, setLastItemAdded] = useState(false);
	const [isBookCoverActive, setIsBookCoverActive] = useState(true);
	const [activeFlipData, setActiveFlipData] = useState(0);
	const book = useRef();

	return (
		// @ts-ignore
		<div className="relative scale-50 ">
			<BookActivationLayer />
			<div
				className={`transition-transform duration-1000 ${
					isBookCoverActive ? "sm:-translate-x-1/4" : ""
				} `}
			>
				<HTMLFlipBook
					width={width}
					minWidth={300}
					height={height}
					ref={book}
					className={`${className} rounded-r-lg`}
					onFlip={(e) => {
						e.data == 0
							? setIsBookCoverActive(true)
							: setIsBookCoverActive(false);

						setActiveFlipData(e.data);
					}}
					onChangeState={(e) => {
						if (activeFlipData == 0 && e.data == "flipping") {
							setIsBookCoverActive(false);
						}
						console.log("changeState", e);
					}}
					showCover={true}
					//usePortrait={true}
					//autoSize={true}
					size={"stretch"}
				>
					{pages?.length > 0 &&
						pages.map((item, index) => {
							return (
								<div key={`book_page_${index}`} className={` ${pageClassName}`}>
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
			</div>
		</div>
	);
}

export { FlipSection };
