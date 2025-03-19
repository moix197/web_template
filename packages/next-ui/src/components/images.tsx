import React from "react";
import { default as NextImage } from "next/image";

function Image({
	src,
	alt,
	width = 100,
	height = 100,
}: {
	src: string;
	alt: string;
	width: number;
	height: number;
}) {
	<NextImage width={width} height={height} src={src} alt={alt}></NextImage>;
}

export { Image };
