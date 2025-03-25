"use client";

import { useEffect, useRef, useState } from "react";
import { Blockquote, Rating, RatingStar } from "flowbite-react";

interface Props {
	items:
		| {
				name: string;
				stars: number;
				content: string;
		  }[];
}

const AutoCarousel = ({ items }: Props) => {
	const [activeItem, setActiveItem] = useState(1);
	const [translateValue, setTranslateValue] = useState("");
	//const val = useRef(activeItem + 1); // Initialize with activeItem + 1

	useEffect(() => {
		if (items?.length == 0) return;
		const intervalId = setInterval(runCarousel, 5000); // Set interval and store its id
		return () => clearInterval(intervalId); // Clear interval on unmount
	}, []);

	function runCarousel() {
		setActiveItem((prevItem) =>
			prevItem + 1 >= items.length ? 0 : prevItem + 1
		); // Update activeItem using prevState
	}

	useEffect(() => {
		let leftValueItem = 110 * activeItem;
		setTranslateValue(`-${leftValueItem}%`);
	}, [activeItem]); // Update translateValue whenever activeItem changes

	return (
		<div className="w-full overflow-hidden">
			<div
				className={`w-full flex relative `}
				style={{ transform: `translateX(${translateValue})` }}
			>
				{items.length > 1 &&
					items.map((item, index) => (
						<div
							key={`item_carousel_${index}`}
							className="flex-1 min-w-full w-full mr-[10%]"
						>
							<div className="flex justify-between mb-4">
								<Rating size="lg">
									<RatingStar />
									<RatingStar />
									<RatingStar />
									<RatingStar />
									<RatingStar />
								</Rating>
							</div>
							<div className="mb-4">
								<Blockquote className="text-inherit font-light text-md">
									{item?.content}
								</Blockquote>
							</div>
							<div className="text-inherit text-lg font-bold uppercase ">
								<h5>{item?.name}</h5>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export { AutoCarousel };
