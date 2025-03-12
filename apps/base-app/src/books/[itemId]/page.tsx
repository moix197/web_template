"use client";

import FlipSection from "@/components/flipBook/flipSection";
import SectionLayout from "../../../components/sections/SectionLayout";
import Image from "next/image";

export default function Home() {
	const pagesContent = [
		{
			title: "Emily & Jack",
			isBookCover: true,
		},
		{
			title: "asdasd",
			isBookCover: true,
			bookCoverInner: true,
		},
		{
			title: "",
			content: `We met on a sunny Saturday afternoon, we both decided to spend the day at the park, each unaware of the other's presence. Emily sat under a large oak tree, sketching the vibrant scenery, while Jack walked Max, his golden retriever, through the park. Fate had other plans for us.
As Emily sketched, a golden blur bounded toward her. Max stopped at her feet, panting happily. "Max! Max, come back here!" Jack called, jogging up, slightly out of breath. "I'm so sorry about that," he said, looking at Emily with an apologetic smile.
"No worries," Emily replied, patting Max's head. "He's adorable."
"I'm Jack, by the way," he said, extending his hand.
"Emily," she replied, shaking his hand.
`,
		},
		{
			title: "How we met",
			image: {
				src: "/images/book/page_1_full.jpg",
				alt: "book page 1 image",
			},
		},
		{
			title: "",
			content: `We met on a sunny Saturday afternoon, we both decided to spend the day at the park, each unaware of the other's presence. Emily sat under a large oak tree, sketching the vibrant scenery, while Jack walked Max, his golden retriever, through the park. Fate had other plans for us.
As Emily sketched, a golden blur bounded toward her. Max stopped at her feet, panting happily. "Max! Max, come back here!" Jack called, jogging up, slightly out of breath. "I'm so sorry about that," he said, looking at Emily with an apologetic smile.
"No worries," Emily replied, patting Max's head. "He's adorable."
"I'm Jack, by the way," he said, extending his hand.
"Emily," she replied, shaking his hand.
`,
		},
		{
			title: "",
			image: {
				src: "/images/book/page_3_full.jpg",
				alt: "book page 3 image",
			},
		},
		{
			title: "",
			content: `We ended up talking for hours, finding common interests and enjoying each other's company. As the sun began to set, we exchanged numbers, both feeling a spark we hadn’t felt in a long time.
Over the next few weeks, we went on several dates, each one more enchanting than the last. We visited art galleries, went hiking, and enjoyed quiet dinners where we talked for hours about our dreams, fears, and everything in between.
On our fifth date, Jack took Emily to a cozy little café that had live jazz music. As the melodies filled the room, Jack confessed, "I've never felt this way before, Emily. I think I'm falling for you."
Emily blushed, her heart racing. "I feel the same way, Jack."
Our relationship blossomed, and we both knew we had found something special.
`,
		},
		{
			title: "",
			content: (
				<div className="flex flex-col w-[200px] relative w-full">
					<div className="mb-8">
						<Image
							className="w-full object-fit"
							src="/images/book/page_8_2.jpg"
							alt="book page 5 image"
							width="600"
							height="600"
						></Image>
					</div>
					<div>
						<Image
							className="w-full"
							src="/images/book/page_8_2.jpg"
							alt="image 2 page 8"
							width="600"
							height="600"
						></Image>
					</div>
				</div>
			),
		},
		{
			title: "The Proposal",
			image: {
				src: "/images/book/page_6_full.jpg",
				alt: "book page 6 image",
			},
		},
		{
			title: "",
			content: `A year after our serendipitous meeting, we knew we wanted to spend the rest of his life with each other. Jack planned a surprise trip to Paris, the city of love, for Emily’s birthday. On the night of her birthday, he took her to the Eiffel Tower. As we stood at the top, overlooking the city lights, Jack got down on one knee.
"Emily, meeting you was the best thing that ever happened to me. Will you marry me?"
With tears of joy streaming down her face, Emily exclaimed, "Yes, Jack! A thousand times yes!"`,
		},

		{
			title: "",
			content: (
				<div className="flex flex-col w-[200px] relative w-full">
					<div className="mb-8 w-full">
						<Image
							className="w-full object-fit"
							src="/images/book/page_8_1.jpg"
							alt="image 1 page 8"
							width="600"
							height="600"
						></Image>
					</div>
					<div>
						<Image
							className="w-full"
							src="/images/book/page_8_2.jpg"
							alt="image 2 page 8"
							width="600"
							height="600"
						></Image>
					</div>
				</div>
			),
		},
		//page 9
		{
			title: "The Wedding",
			image: {
				src: "/images/book/page_9_full.jpg",
				alt: "book page 9 image",
			},
		},
		//page 10
		{
			title: "",
			content: `On April 6th 2021 we said I do. Our wedding was a beautiful celebration of our love. We chose a picturesque vineyard for the venue, surrounded by family and friends. Emily walked down the aisle in a stunning lace gown, her heart pounding with happiness.
As we exchanged vows, there wasn’t a dry eye in the audience. "I promise to love you, support you, and cherish every moment we have together," Jack vowed.
"And I promise to stand by your side, through all the joys and challenges life brings," Emily replied.
When we kissed, it felt like the beginning of a wonderful new chapter.
`,
		},
		//page 11
		{
			title: "",
			image: {
				src: "/images/book/page_11_full.jpg",
				alt: "book page 11 image",
			},
		},
		//page 12
		{
			title: "",
			content: (
				<div className="flex flex-col w-[200px] relative w-full">
					<div className="mb-8 w-full">
						<Image
							className="w-full object-fit"
							src="/images/book/page_12_1.jpg"
							alt="image 1 page 12"
							width="600"
							height="600"
						></Image>
					</div>
					<div>
						<Image
							className="w-full"
							src="/images/book/page_12_2.jpg"
							alt="image 2 page 12"
							width="600"
							height="600"
						></Image>
					</div>
				</div>
			),
		},
		//page 13
		{
			title: "",
			image: {
				src: "/images/book/page_13_full.jpg",
				alt: "book page 13 image",
			},
		},
		//page 14
		{
			title: "The Journey to Parenthood",
			image: {
				src: "/images/book/page_14_full.jpg",
				alt: "book page 14 image",
			},
		},
		//page 15
		{
			title: "",
			content: `A year after our wedding, we decided we were ready to start a family. We were overjoyed when Emily discovered she was pregnant. Throughout the pregnancy, Jack was by Emily's side, attending every doctor's appointment and ensuring she was comfortable.
We decorated the nursery together, choosing a woodland theme with soft colors. As we painted the walls and assembled the crib, we talked about the future and the kind of parents we wanted to be.
The day finally arrived. Emily went into labor early in the morning, and Jack rushed her to the hospital. After several hours of labor, our baby girl, Lily, was born. When the nurse placed Lily in Emily’s arms, we were overwhelmed with love and joy.
"She's perfect," Jack whispered, tears in his eyes.
Emily smiled, exhausted but elated. "We made her, Jack. Our little miracle."
As we gazed at our newborn daughter, we knew our lives had changed forever in the best possible way.
`,
		},
		//page 16
		{
			title: "",
			content: (
				<div className="flex flex-col w-[200px] relative w-full">
					<div className="mb-8 w-full">
						<Image
							className="w-full object-fit"
							src="/images/book/page_16_1.jpg"
							alt="image 1 page 16"
							width="600"
							height="600"
						></Image>
					</div>
					<div>
						<Image
							className="w-full"
							src="/images/book/page_16_2.jpg"
							alt="image 2 page 16"
							width="600"
							height="600"
						></Image>
					</div>
				</div>
			),
		},
		//page 17
		{
			title: "A New Beginning",
			image: {
				src: "/images/book/page_17_full.jpg",
				alt: "book page 17 image",
			},
		},
		//page 18
		{
			title: "",
			content: `We settled into our new life as a family. Every day brought new challenges and new joys, from sleepless nights to first smiles. Our love for each other grew even stronger as we navigated parenthood together.
Sitting on the porch one evening, with Lily asleep in Jack’s arms, Emily looked at her husband and said, "We’re a family now, Jack. I couldn’t be happier."
Jack kissed her forehead. "Me neither, Emily. This is just the beginning of our beautiful journey."
And so, our story continued, filled with love, laughter, and the promise of many more wonderful chapters to come.
`,
		},
		//page 19
		{
			title: "",
			content: (
				<div className="flex flex-col w-[200px] relative w-full">
					<div className="mb-8 w-full">
						<Image
							className="w-full object-fit"
							src="/images/book/page_19_1.jpg"
							alt="image 1 page 19"
							width="600"
							height="600"
						></Image>
					</div>
					<div>
						<Image
							className="w-full"
							src="/images/book/page_19_2.jpg"
							alt="image 2 page 19"
							width="600"
							height="600"
						></Image>
					</div>
				</div>
			),
		},
		//page 20
		{
			title: "",
			content: (
				<div className="flex flex-col w-[200px] relative w-full">
					<div className="mb-8 w-full">
						<Image
							className="w-full object-fit"
							src="/images/book/page_20_1.jpg"
							alt="image 1 page 20"
							width="600"
							height="600"
						></Image>
					</div>
					<div>
						<Image
							className="w-full"
							src="/images/book/page_20_2.jpg"
							alt="image 2 page 20"
							width="600"
							height="600"
						></Image>
					</div>
				</div>
			),
		},
	];
	return (
		<SectionLayout className="!p-0 min-h-screen">
			<div className="flex justify-center items-center ">
				<div className="max-w-[1200px] w-[600px] max-h-[100vh] cursor-pointer overflow-hidden">
					<FlipSection
						pages={pagesContent}
						className="bg-gray-500"
						pageClassName={
							"bg-transparent text-black shadow-2xl drop-shadow-2xl"
						}
						width={600}
						height={800}
						bookCoverClassName=""
					></FlipSection>
				</div>
			</div>
		</SectionLayout>
	);
}
