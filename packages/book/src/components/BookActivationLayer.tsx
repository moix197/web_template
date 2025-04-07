function BookActivationLayer({ clickCb }) {
	return (
		<div
			className="w-full h-full opacity-0 absolute top-0 left-0 z-10"
			onClick={() => clickCb()}
		></div>
	);
}

export { BookActivationLayer };
