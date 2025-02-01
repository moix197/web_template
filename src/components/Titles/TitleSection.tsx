interface Props {
	children: React.ReactNode;
	className?: string;
}

const TitleSection = ({ children = "", className = "" }: Props) => {
	return (
		<h5 className={`text-4xl uppercase font-bold ${className}`}>{children}</h5>
	);
};

export default TitleSection;
