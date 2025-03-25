import { ReactNode } from "react";

interface Props {
	children: React.ReactNode;
	className?: string;
}

function TitleXl({ children, className }: Props) {
	return (
		<div
			className={`w-full text-secondary text-2xl font-bold uppercase ${className}`}
		>
			<div>{children}</div>
		</div>
	);
}

function TitleLg({ children, className }: Props) {
	return (
		<div
			className={`w-full text-center text-lg uppercase text-secondary font-bold ${className}`}
		>
			<div>{children}</div>
		</div>
	);
}

const TitleSection = ({ children = "", className = "" }: Props) => {
	return (
		<h5 className={`text-4xl uppercase font-bold ${className}`}>{children}</h5>
	);
};

export { TitleXl, TitleLg, TitleSection };
