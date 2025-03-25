import { Button } from "flowbite-react";
import { Spinner } from "flowbite-react";
import React from "react";
import { Link } from "@base/next-ui";

interface Props {
	children: React.ReactNode;
	href?: string;
	className?: string;
	color?: string;
	disabled?: boolean;
	isLoading?: boolean;
	onClick?: () => void | undefined;
}

const SolidButton = ({
	children,
	href = "",
	className,
	color = "primary",
	onClick = undefined,
	disabled = false,
	isLoading = false,
}: Props) => {
	const colorClass =
		color == "primary"
			? "bg-primary text-secondary border-secondary hover:bg-secondary hover:text-primary hover:border-primary"
			: "bg-secondary text-primary border-primary hover:bg-primary hover:text-secondary hover:border-secondary";
	return (
		<>
			{!onClick ? (
				<Link
					href={href}
					className={`${className} border p-4 uppercase font-bold 
			rounded-lg w-[300px] text-center ${colorClass} block`}
				>
					{children}
				</Link>
			) : (
				<Button
					onClick={() => {
						if (disabled) return;
						onClick();
					}}
					color="blue"
					className={`flex uppercase w-full bg-third hover:third-dark !ring-0 ${className}`}
				>
					{!isLoading ? (
						children
					) : (
						<Spinner size="sm" aria-label="Loading Button"></Spinner>
					)}
				</Button>
			)}
		</>
	);
};

export { SolidButton };
