import {
	Accordion,
	AccordionContent,
	AccordionPanel,
	AccordionTitle,
} from "flowbite-react";

function AccordionSection() {
	const items = [
		{ title: "Title 1", content: "content 1" },
		{ title: "Title 2", content: "content 2" },
		{ title: "Title 3", content: "content 3" },
	];
	return (
		<Accordion className="w-full">
			{items.map((item, index) => (
				<AccordionPanel key={`Accordion_item_1_${index}`}>
					<AccordionTitle>{item.title}</AccordionTitle>
					<AccordionContent>
						<p className="text-gray-500 dark:text-gray-400">{item.content}</p>
					</AccordionContent>
				</AccordionPanel>
			))}
		</Accordion>
	);
}

export { AccordionSection };
