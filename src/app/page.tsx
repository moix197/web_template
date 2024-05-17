import Reviews from "@/components/sections/Reviews";
import Hero from "@/components/sections/Hero";
import PlansShowCase from "@/components/sections/PlansShowcase";
import SectionWithContent from "@/components/sections/SectionWithContent";
import { HomeSectionsData } from "@/data/sections";

export default function Home() {
	const sections = [
		{
			titleText: "Section 1",
			contentText:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nulla unde cum, tenetur corrupti sequi. Saepe, laborum, eveniet ratione autem nam porro accusamus voluptatibus dolore in assumenda ab delectus tenetur vel unde pariatur quas provident temporibus neque dolor tempore? Iure explicabo repudiandae eaque voluptatem nostrum ab eum veritatis, doloribus soluta.",
			titleAlign: "text-center",
			textAlign: "text-center",
			position: "center",
		},

		{
			className: "bg-bg3 bg-no-repeat bg-[25%] bg-cover py-72",
			useImageSmoother: true,
			dividers: {
				top: { type: "wave", className: "!fill-primary" },
				bottom: { type: "wave", className: "!fill-secondary" },
			},
		},

		{
			titleText: "Section 2",
			contentText:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nulla unde cum, tenetur corrupti sequi. Saepe, laborum, eveniet ratione autem nam porro accusamus voluptatibus dolore in assumenda ab delectus tenetur vel unde pariatur quas provident temporibus neque dolor tempore? Iure explicabo repudiandae eaque voluptatem nostrum ab eum veritatis, doloribus soluta.",
			titleAlign: "text-center",
			textAlign: "text-center",
			position: "center",
			className: "bg-secondary text-primary",

			button: {
				text: "click here",
				position: "justify-center",
				href: "#",
				color: "secondary",
			},
		},

		{
			className: "bg-bg2 bg-no-repeat bg-[25%] bg-cover py-72",
			useImageSmoother: true,
			dividers: {
				top: { type: "wave", className: "!fill-secondary" },
				bottom: { type: "wave", className: "!fill-primary" },
			},
		},
		{
			titleText: "Section 3",
			contentText:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nulla unde cum, tenetur corrupti sequi. Saepe, laborum, eveniet ratione autem nam porro accusamus voluptatibus dolore in assumenda ab delectus tenetur vel unde pariatur quas provident temporibus neque dolor tempore? Iure explicabo repudiandae eaque voluptatem nostrum ab eum veritatis, doloribus soluta.",
			titleAlign: "text-center",
			textAlign: "text-center",
			position: "center",
		},
		{
			titleText: "",
			titleAlign: "text-center",
			textAlign: "text-center",
			position: "center",
			className: "bg-bg9 bg-no-repeat bg-[25%] bg-cover py-72",
			useImageSmoother: true,
			dividers: {
				top: { type: "wave", className: "!fill-primary" },
				bottom: { type: "wave", className: "!fill-primary" },
			},
			button: {
				text: "click here",
				position: "justify-end",
				href: "#",
				color: "secondary",
			},
		},
	];

	return (
		<div>
			<Hero
				title="HERO TEST TITLE"
				position={"left"}
				titleAlign="!text-center sm:text-left"
				textAlign="text-center sm:text-left"
				button={{
					text: "click here",
					position: "justify-center sm:justify-start",
					href: "/prices",
					color: "secondary",
				}}
				dividers={{ bottom: { type: "wave", className: "!fill-primary" } }}
				className="!min-h-[calc(100vh-45px)] md:!min-h-[calc(100vh-52px)] !items-end"
				contentText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
				necessitatibus consequatur nesciunt cum ipsam a voluptates excepturi
				illum cumque. Molestiae repellat quas iusto magnam, modi omnis atque
				itaque ut rem."
			></Hero>
			{sections &&
				sections.map((item, index) => {
					return (
						<SectionWithContent
							key={`Section_${index}`}
							titleText={item.titleText}
							contentText={item.contentText}
							titleAlign={item.titleAlign}
							textAlign={item.textAlign}
							position={item.position}
							className={item?.className}
							button={item?.button}
							dividers={item?.dividers}
							useImageSmoother={item?.useImageSmoother}
						></SectionWithContent>
					);
				})}
		</div>
	);
}
