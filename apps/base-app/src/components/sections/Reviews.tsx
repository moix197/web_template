"use client";

import AutoCarousel from "../carousels/AutoCarousel";
import SectionLayout from "./SectionLayout";

interface Props {
	className?: string | undefined;
}

const Reviews = ({ className = "" }: Props) => {
	const reviews = [
		{
			name: "Makenzie Raesner Supak",
			stars: 5,
			content: `"We hired EP Films for our wedding in College Station, Texas after seeing their work from one of our friends wedding & let me just tell you...  Their team does not disappoint! From the very beginning their team has been nothing short of amazing at communication & making sure we would be happy with the end product. They made the process a BREEZE & were an ABSOLUTE DREAM to work with! Before the wedding we had a meeting with Rafael to talk about the details that were important to us and to make sure we had all of our ducks in a row for the day of. This was so helpful at putting this stressed out bride's mind at ease. Over the past couple of months we have been getting our teaser, highlight video & today our entire wedding video package & let me tell you... CUE THE TEARS & GRAB A TISSUE! They did such an amazing job at capturing all the raw emotions & shear happiness of our day. We are so thankful Rafael & EP team was there to capture all of those memories that we will cherish forever!"`,
		},
		{
			name: "Lotus Philosophy",
			stars: 5,
			content: `"Awesome company to work with! Captured everything beautifully. Our videographer has such a creative eye, would 100% recommend."`,
		},
	];
	return (
		<SectionLayout className={className}>
			<div className="w-full max-w-3xl">
				<AutoCarousel items={reviews}></AutoCarousel>
			</div>
		</SectionLayout>
	);
};

export default Reviews;
