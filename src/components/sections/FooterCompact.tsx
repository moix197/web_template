"use client";

import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { getThemeColors } from "@/utils/theme";

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
				href: string;
				name: string;
		  }[]
		| undefined;
	socials?:
		| {
				name: string;
				href: string;
		  }[]
		| undefined;
}

const FooterCompact = ({
	colorSchema = "primary",
	brand = { src: "" },
	legal = { text: "", href: "", year: 0 },
	items = undefined,
	socials = undefined,
}: Props) => {
	const colors = getThemeColors(colorSchema);

	function getSocialIcon(value: string) {
		switch (value) {
			case "instagram":
				return BsInstagram;
			case "twitter":
				return BsTwitter;
			case "whatsapp":
				return BsWhatsapp;
		}
		return BsFacebook;
	}

	return (
		<Footer
			container
			className={`rounded-none ${colors.bg} flex !justify-center`}
		>
			<div className="max-w-screen-2xl w-full">
				<div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
					{brand?.src && (
						<div>
							<Footer.Brand
								href={brand?.href}
								src={brand?.src}
								alt={brand?.alt}
								name={brand?.name}
							/>
						</div>
					)}

					{items && (
						<Footer.LinkGroup>
							{items.map((item, itemIndex) => (
								<Footer.Link
									key={`${item.name.split(" ").join("_")}_${itemIndex}`}
									href={item?.href}
									className={`${colors.txt}`}
								>
									{item?.name}
								</Footer.Link>
							))}
						</Footer.LinkGroup>
					)}
				</div>
				<Footer.Divider />
				<div className="w-full mt-3 sm:flex sm:items-center sm:justify-between">
					{legal?.text && (
						<Footer.Copyright
							className={`${colors.txt} uppercase`}
							href={legal.href}
							by={legal.text && ` ${legal.text}`}
							year={legal?.year}
						/>
					)}
					{socials && (
						<div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
							{socials.map((item) => (
								<Footer.Icon
									className={`${colors.txt}`}
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

export default FooterCompact;
