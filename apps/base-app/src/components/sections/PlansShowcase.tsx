import { Card } from "flowbite-react";
import TitleSection from "../Titles/TitleSection";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SolidButton } from "../buttons/Buttons";
import SinglePriceCard from "../SinglePriceCard";

const plans = [
	{
		name: "silver",
		price: "$2,350",
		ctaText: "get this",
		content: [
			{
				title: "deliverables",
				items: [
					{
						text: "1 minute Teaser (Guaranteed Delivery in 2 weeks)",
						has: "ok",
					},
					{
						text: "Full length recording of the ceremony",
						has: "ok",
					},
					{
						text: "Cinema composed highlight (5 Minutes)",
						has: "ok",
					},
				],
			},
			{
				title: "production",
				items: [
					{
						text: "7 Hours of Ceremony and Reception Coverag (limited to 2 locations)",
						has: "ok",
					},
					{ text: "1 Cinematographer", has: "ok" },
					{ text: "Dedicated Wedding Film Specialist ", has: "ok" },
					{ text: "Aerial Video with Drone", has: "ok" },
					{ text: "Professional Sound Design and Music Licensing", has: "ok" },
					{
						text: "Cinematic Editing Professional Color Grading of all Shots",
						has: "ok",
					},
					{ text: "Entire event filmed in UHD 4k", has: "ok" },
					{ text: "Digital Delivery of all the videos", has: "ok" },
				],
			},
		],
	},
	{
		name: "silver",
		price: "$2,350",
		ctaText: "get this",
		content: [
			{
				title: "deliverables",
				items: [
					{
						text: "1 minute Teaser (Guaranteed Delivery in 2 weeks)",
						has: "ok",
					},
					{
						text: "Full length recording of the ceremony",
						has: "ok",
					},
					{
						text: "Cinema composed highlight (5 Minutes)",
						has: "ok",
					},
				],
			},
			{
				title: "production",
				items: [
					{
						text: "7 Hours of Ceremony and Reception Coverag (limited to 2 locations)",
						has: "ok",
					},
					{ text: "1 Cinematographer", has: "ok" },
					{ text: "Dedicated Wedding Film Specialist ", has: "ok" },
					{ text: "Aerial Video with Drone", has: "ok" },
					{ text: "Professional Sound Design and Music Licensing", has: "ok" },
					{
						text: "Cinematic Editing Professional Color Grading of all Shots",
						has: "ok",
					},
					{ text: "Entire event filmed in UHD 4k", has: "ok" },
					{ text: "Digital Delivery of all the videos", has: "ok" },
				],
			},
		],
	},
	{
		name: "silver",
		price: "$2,350",
		ctaText: "get this",
		content: [
			{
				title: "deliverables",
				items: [
					{
						text: "1 minute Teaser (Guaranteed Delivery in 2 weeks)",
						has: "ok",
					},
					{
						text: "Full length recording of the ceremony",
						has: "ok",
					},
					{
						text: "Cinema composed highlight (5 Minutes)",
						has: "ok",
					},
				],
			},
			{
				title: "production",
				items: [
					{
						text: "7 Hours of Ceremony and Reception Coverag (limited to 2 locations)",
						has: "ok",
					},
					{ text: "1 Cinematographer", has: "ok" },
					{ text: "Dedicated Wedding Film Specialist ", has: "ok" },
					{ text: "Aerial Video with Drone", has: "ok" },
					{ text: "Professional Sound Design and Music Licensing", has: "ok" },
					{
						text: "Cinematic Editing Professional Color Grading of all Shots",
						has: "ok",
					},
					{ text: "Entire event filmed in UHD 4k", has: "ok" },
					{ text: "Digital Delivery of all the videos", has: "ok" },
				],
			},
		],
	},
	{
		name: "silver",
		price: "$2,350",
		ctaText: "get this",
		content: [
			{
				title: "deliverables",
				items: [
					{
						text: "1 minute Teaser (Guaranteed Delivery in 2 weeks)",
						has: "ok",
					},
					{
						text: "Full length recording of the ceremony",
						has: "ok",
					},
					{
						text: "Cinema composed highlight (5 Minutes)",
						has: "ok",
					},
				],
			},
			{
				title: "production",
				items: [
					{
						text: "7 Hours of Ceremony and Reception Coverage",
						hint: "limited to 2 locations",
						has: "ok",
					},
					{ text: "1 Cinematographer", has: "ok" },
					{ text: "Dedicated Wedding Film Specialist ", has: "ok" },
					{ text: "Aerial Video with Drone", has: "ok" },
					{ text: "Professional Sound Design and Music Licensing", has: "ok" },
					{
						text: "Cinematic Editing Professional Color Grading of all Shots",
						has: "ok",
					},
					{ text: "Entire event filmed in UHD 4k", has: "ok" },
					{ text: "Digital Delivery of all the videos", has: "none" },
				],
			},
		],
	},
];
function PlansShowCase() {
	return (
		<div className="max-w-screen-2xl w-full text-center">
			<div className="mb-8">
				<TitleSection>plans showcase section</TitleSection>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{plans &&
					plans.map((item, index) => (
						<SinglePriceCard
							key={`${item.name}_price_item_${index}`}
							name={item.name}
							price={item.price}
							ctaText={item.ctaText}
							content={item.content}
						></SinglePriceCard>
					))}
			</div>
		</div>
	);
}

export default PlansShowCase;
