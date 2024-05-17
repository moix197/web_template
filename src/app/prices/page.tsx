import Accordion from "@/components/sections/Accordion";
import Hero from "@/components/sections/Hero";
import PlansShowCase from "@/components/sections/PlansShowcase";
import SectionLayout from "@/components/sections/SectionLayout";
import SectionWithContent from "@/components/sections/SectionWithContent";
import { HomeSectionsData } from "@/data/sections";

export default function Prices() {
	return (
		<div>
			<Hero
				title="HERO TEST TITLE"
				className="text-center"
				dividers={{ bottom: { type: "wave", className: "fill-secondary" } }}
			>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
				</p>
			</Hero>
			<SectionLayout
				className="bg-secondary text-primary"
				dividers={{ bottom: { type: "wave", className: "fill-primary" } }}
			>
				<PlansShowCase></PlansShowCase>
			</SectionLayout>
		</div>
	);
}
