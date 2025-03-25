function SingleInputParent({ children, className = "" }) {
	return (
		<div className={`flex-auto ${className}`}>
			<div>{children && children}</div>
		</div>
	);
}

export default SingleInputParent;
