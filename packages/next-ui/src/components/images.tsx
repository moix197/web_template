import React from "react";
import { default as NextImage } from "next/image";

function Image({
	src,
	alt,
	width = 100,
	height = 100,
	fill = false,
	className = "",
}: {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fill?: boolean;
	className?: string;
}) {
	return (
		<NextImage
			width={width}
			height={height}
			src={src}
			alt={alt}
			fill={fill}
			className={className}
		/>
	);
}

export { Image };
