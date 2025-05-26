interface SingleInputParentProps {
	children: React.ReactNode;
	className?: string;
}

function SingleInputParent({
	children,
	className = "",
}: SingleInputParentProps) {
	return (
		<div className={`flex-auto ${className}`}>
			<div>{children && children}</div>
		</div>
	);
}

export default SingleInputParent;
