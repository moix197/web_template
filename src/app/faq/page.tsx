import Accordion from "@/components/sections/Accordion";
import Hero from "@/components/sections/Hero";
import SectionLayout from "@/components/sections/SectionLayout";

function Faq() {
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
				className="bg-secondary pt-20"
				dividers={{ bottom: { type: "wave", className: "fill-primary" } }}
			>
				<div className="w-full max-w-5xl">
					<Accordion></Accordion>
				</div>
			</SectionLayout>
		</div>
	);
}

export default Faq;
