import Image from "next/image";
import { useEffect } from "react";

export default function ImageBg({ className = "", src = "", alt = "" }) {
	return (
		<div className={`absolute w-full h-full top-0 left-0 `}>
			<Image
				src={src}
				alt={alt}
				className={`object-cover w-full h-full z-10 ${className}`}
				fill={true}
			></Image>
		</div>
	);
}
