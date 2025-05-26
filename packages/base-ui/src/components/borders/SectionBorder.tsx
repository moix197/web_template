interface SectionBorderProps {
	children: React.ReactNode;
	className?: string;
}

function SectionBorder({ children, className = "" }: SectionBorderProps) {
	return (
		<div className={`p-2 ${className}`}>
			<div className="border border-gray-600 p-4 rounded-lg">
				{children && children}
			</div>
		</div>
	);
}

export { SectionBorder };
