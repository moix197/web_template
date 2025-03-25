import { Image } from "@moix197/next-ui";

export default function ImageBg({ className = "", src = "", alt = "" }) {
	return (
		<div className={`absolute w-full h-full top-0 left-0 `}>
			<Image
				src={src}
				alt={alt}
				width={null}
				height={null}
				className={`object-cover w-full h-full z-10 ${className}`}
				fill={true}
			></Image>
		</div>
	);
}

export { ImageBg };
