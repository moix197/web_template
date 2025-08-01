"use client";

import {
	Footer,
	FooterBrand,
	FooterCopyright,
	FooterDivider,
	FooterIcon,
	FooterLink,
	FooterLinkGroup,
	FooterTitle,
} from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

interface Props {
	colorSchema?: string;
	brand?:
		| {
				href?: string;
				src: string;
				alt?: string;
				name?: string;
		  }
		| undefined;
	legal?:
		| {
				text?: string;
				href?: string;
				year?: number | undefined;
		  }
		| undefined;
	items?:
		| {
				title: string;
				children: { href: string; name: string }[];
		  }[]
		| undefined;
	socials?:
		| {
				name: string;
				href: string;
		  }[]
		| undefined;
}

const WebFooter = ({
	colorSchema = "primary",
	brand = { src: "" },
	legal = { text: "", href: "", year: 0 },
	items = undefined,
	socials = undefined,
}: Props) => {
	function getSocialIcon(value: string) {
		switch (value) {
			case "instagram":
				return BsInstagram;
			case "twitter":
				return BsTwitter;
		}
		return BsFacebook;
	}

	return (
		<Footer container className={`rounded-none flex !justify-center`}>
			<div className="max-w-screen-2xl w-full">
				<div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
					{brand?.src && (
						<div>
							<FooterBrand
								href={brand?.href}
								src={brand?.src}
								alt={brand?.alt}
								name={brand?.name}
							/>
						</div>
					)}
					<div
						className={`grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-${items?.length} sm:gap-6`}
					>
						{items &&
							items.map((item, parentIndex) => {
								return (
									<div key={`footer_parent_item_${parentIndex}`}>
										<FooterTitle title={item?.title} />
										<FooterLinkGroup col>
											{item.children.map((childItem, childItemIndex) => (
												<FooterLink
													key={`${childItem.name
														.split(" ")
														.join("_")}_${childItemIndex}`}
													href={childItem?.href}
												>
													{childItem?.name}
												</FooterLink>
											))}
										</FooterLinkGroup>
									</div>
								);
							})}
					</div>
				</div>
				<FooterDivider />
				<div className="w-full mt-3 sm:flex sm:items-center sm:justify-between">
					{legal?.text && (
						<FooterCopyright
							className={` uppercase`}
							href={legal.href}
							by={legal.text && ` ${legal.text}`}
							year={legal?.year}
						/>
					)}
					{socials && (
						<div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
							{socials.map((item) => (
								<FooterIcon
									key={`${item.name}_footer`}
									href={item?.href}
									icon={getSocialIcon(item.name)}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</Footer>
	);
};

export { WebFooter };
