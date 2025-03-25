import { Card, Tooltip } from "flowbite-react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SolidButton } from "../buttons/GeneralButtons";
import { BsExclamationCircle } from "react-icons/bs";

interface Props {
	className?: string | undefined;
	name?: string | undefined;
	price?: string | undefined;
	ctaText?: string | undefined;
	content?:
		| {
				title: string;
				items: {
					has?: string;
					hint?: string;
					text?: string;
				}[];
		  }[]
		| undefined;
}

const SinglePriceCard = ({
	className,
	name,
	price,
	ctaText,
	content,
}: Props) => {
	return (
		<Card className={`w-full ${className}`}>
			<div className="uppercase text-2xl font-bold mb-4">
				<h5>{name}</h5>
			</div>
			<div>
				{content &&
					content.map((contentItem, index) => (
						<div
							key={`${contentItem.title.split(" ").join("_")}_${index}`}
							className="mb-6"
						>
							<div className="uppercase font-bold mb-3">
								<h5>{contentItem.title}</h5>
							</div>
							<div>
								<ul className="text-left">
									{contentItem.items.map((itemValue, childIndex) => (
										<li
											key={`${contentItem.title
												.split(" ")
												.join("_")}_children_${childIndex}`}
											className="mb-2 md:mb-4"
										>
											<div className="flex flex-1">
												<div>
													{itemValue.has == "ok" ? (
														<FaRegCheckCircle className="mr-2 mt-1 text-green-600"></FaRegCheckCircle>
													) : (
														<IoIosCloseCircleOutline className="mr-2 mt-1 text-gray-400"></IoIosCloseCircleOutline>
													)}
												</div>
												<div
													className={`grow ${
														itemValue.has == "none" && "line-through opacity-50"
													}`}
												>
													{itemValue.text}
												</div>
												{itemValue?.hint && (
													<div>
														<Tooltip content={itemValue?.hint} placement="left">
															<BsExclamationCircle className="ml-2 mt-1 text-yellow-600 justify-self-end cursor-pointer"></BsExclamationCircle>
														</Tooltip>
													</div>
												)}
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
			</div>
			{price && (
				<div className="uppercase text-4xl font-bold ">
					<h5>{price}</h5>
				</div>
			)}
			{ctaText && (
				<div className="uppercase font-bold mt-4">
					<SolidButton href="#" className="w-full">
						{ctaText}
					</SolidButton>
				</div>
			)}
		</Card>
	);
};

export { SinglePriceCard };
