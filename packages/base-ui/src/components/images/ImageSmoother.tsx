function ImageSmoother({ className = "" }) {
	return (
		<div
			className={`absolute w-full h-full top-0 left-0 before:content-[ ] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gray-900 before:z-10 before:opacity-60 ${className}`}
		></div>
	);
}

export { ImageSmoother };
