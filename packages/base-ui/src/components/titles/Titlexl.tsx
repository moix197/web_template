interface Props {
	children: React.ReactNode;
	className?: string;
}

const TitleMain = ({ children, className }: Props) => {
	return <h1 className={`text-5xl font-bold ${className}`}>{children}</h1>;
};

export { TitleMain };
