import Link from "next/link";
import { Button, CustomFlowbiteTheme } from "flowbite-react";

interface Props {
	children: React.ReactNode;
	href: string;
	className?: string;
	color?: string;
	onClick?: () => void | undefined;
}

const SolidButton = ({
	children,
	href,
	className,
	color = "primary",
	onClick = undefined,
}: Props) => {
	const colorClass =
		color == "primary"
			? "bg-primary text-secondary border-secondary hover:bg-secondary hover:text-primary hover:border-primary"
			: "bg-secondary text-primary border-primary hover:bg-primary hover:text-secondary hover:border-secondary";
	return (
		<div>
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
						onClick();
					}}
				></Button>
			)}
		</div>
	);
};

export { SolidButton };
