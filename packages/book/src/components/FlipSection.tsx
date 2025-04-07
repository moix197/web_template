"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { BookContent } from "./BookContent";
import { BookCover } from "./BookCover";
import { BookActivationLayer } from "./BookActivationLayer";
import { delay, SolidButton, SideNav } from "@moix197/base-ui";

function FlipSection({
	pages = [],
	className = "",
	pageClassName = "",
	bookCoverClassName = "",
}) {
	const [lastItemAdded, setLastItemAdded] = useState(false);
	const [isBookCoverActive, setIsBookCoverActive] = useState(true);
	const [activeFlipData, setActiveFlipData] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [dimensions, setDimensions] = useState({ width: 600, height: 700 });
	const book = useRef();

	// Debounced resize handler
	useEffect(() => {
		let timeoutId: number;

		function updateDimensions() {
			if (window.innerWidth < 640) {
				// Small screens
				setDimensions({ width: 300, height: 400 });
			} else if (window.innerWidth < 1279) {
				console.log("large", window.innerWidth);
				// Medium screens
				setDimensions({ width: 700, height: 900 });
			} else {
				// Large screens
				console.log("extra large", window.innerWidth);
				setDimensions({ width: 700, height: 900 });
			}
		}

		function handleResize() {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(updateDimensions, 200); // Debounce for 200ms
		}

		// Initial dimensions setup
		updateDimensions();

		// Add event listener for window resize
		window.addEventListener("resize", handleResize);

		// Cleanup event listener on unmount
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	function clickCb() {
		isOpen ? closeBook() : openBook();
	}

	async function openBook() {
		setIsOpen(true);
		await delay(500);
		if (book?.current) {
			book?.current?.pageFlip().flip(2);
		}
	}

	async function closeBook() {
		if (book?.current) {
			book?.current?.pageFlip().flip(0);
		}
		await delay(500);
		setIsBookCoverActive(true);
		await delay(500);
		setIsOpen(false);
	}

	async function turnToPageWithDelay() {
		if (!book?.current) return;

		let currentPageIndex = book.current.pageFlip().getCurrentPageIndex();

		while (currentPageIndex > 0) {
			book?.current?.pageFlip().flipPrev();
			await delay(500); // Wait for 100ms
			currentPageIndex = book?.current?.pageFlip().getCurrentPageIndex();
		}
	}

	return (
		<>
			<SideNav
				className="w-[200px]"
				navItems={pages.map((item, index) => {
					return {
						label: item.title,
						onClick: async () => {
							if (!isOpen) {
								setIsOpen(true);
								await delay(500);
							}
							book?.current?.pageFlip().flip(index);
						},
					};
				})}
			></SideNav>
			<div className="max-w-[1200px] overflow-hidden w-full md:!w-[calc(100%-200px)] md:ml-[200px]">
				<div className="mb-4 flex justify-center">
					<SolidButton
						onClick={() => clickCb()}
						className="w-auto !bg-transparent"
					>
						{!isOpen ? "Open" : "Close"} Book
					</SolidButton>
				</div>
				<div className="flex justify-center items-center">
					<div
						className={` relative w-[350px] sm:w-[500px] md:w-[600px] lg:w-[800px] lg:h-[500px] xl:w-[1000px] 2xl:w-[1270px] origin-top transition-transform duration-500 ${
							!isOpen ? "scale-40" : ""
						}`}
					>
						{!isOpen && <BookActivationLayer clickCb={clickCb} />}
						<div
							className={`transition-transform duration-500 md:px-8 ${
								isBookCoverActive ? "lg:-translate-x-1/4" : ""
							} `}
						>
							<HTMLFlipBook
								width={dimensions.width}
								height={dimensions.height}
								minWidth={300}
								ref={book}
								className={`${className} rounded-r-lg`}
								flippingTime={500}
								onFlip={(e) => {
									e.data == 0
										? setIsBookCoverActive(true)
										: setIsBookCoverActive(false);

									setActiveFlipData(e.data);
								}}
								onChangeState={(e) => {
									console.log("e.data", e.data);
									if (activeFlipData == 0 && e.data == "read") {
										setIsBookCoverActive(false);
									}
								}}
								showCover={true}
								//autoSize={true}
								size={"stretch"}
							>
								{pages?.length > 0 &&
									pages.map((item, index) => {
										return (
											<div
												key={`book_page_${index}`}
												className={` ${pageClassName}`}
											>
												{item?.type == "front" || item?.type == "frontInner" ? (
													<BookCover
														title={item?.title}
														bookCoverInner={item?.type == "frontInner"}
														className={bookCoverClassName}
													></BookCover>
												) : (
													<BookContent
														title={item?.title}
														content={item?.content}
														className={item?.className}
														image={item?.image}
													></BookContent>
												)}
											</div>
										);
									})}
							</HTMLFlipBook>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export { FlipSection };
