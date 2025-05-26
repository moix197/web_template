import { Button } from "flowbite-react";
import { Spinner } from "flowbite-react";
import React from "react";
import { Link } from "@moix197/next-ui";

interface Props {
	children: React.ReactNode;
	href?: string;
	className?: string;
	color?: string;
	disabled?: boolean;
	isLoading?: boolean;
	onClick?: (() => void) | (() => Promise<void>) | undefined;
}

const SolidButton = ({
	children,
	href,
	className,
	color = "primary",
	onClick = undefined,
	disabled = false,
	isLoading = false,
}: Props) => {
	const buttonProps = {
		className: `flex uppercase !cursor-pointer w-full bg-third hover:third-dark !ring-0 ${className}`,
		color: "blue" as const,
		...(href ? { as: Link, href } : {}),
		...(onClick && !href ? { onClick: () => !disabled && onClick() } : {}),
	};

	return (
		<Button {...buttonProps}>
			{!isLoading ? (
				children
			) : (
				<Spinner size="sm" aria-label="Loading Button"></Spinner>
			)}
		</Button>
	);
};

export { SolidButton };
