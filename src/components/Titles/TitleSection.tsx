interface Props {
	children: React.ReactNode;
}

const TitleSection = ({ children = "" }: Props) => {
	return <h5 className="text-3xl uppercase font-bold">{children}</h5>;
};

export default TitleSection;
