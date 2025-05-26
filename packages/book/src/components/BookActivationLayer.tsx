interface BookActivationLayerProps {
	clickCb: () => void;
}

function BookActivationLayer({ clickCb }: BookActivationLayerProps) {
	return (
		<div
			className="w-full h-full opacity-0 absolute top-0 left-0 z-10"
			onClick={() => clickCb()}
		></div>
	);
}

export { BookActivationLayer };
