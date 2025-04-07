import fitty from "fitty";
import { useEffect, useRef } from "react";

function BookContent({
	title = "",
	content = "",
	className = "",
	image = {
		src: "",
		alt: "",
	},
}) {
	const borderClass = image?.src ? "" : "";
	//: " border border-gray-800 outline outline-1 outline-offset-8";

	const imageSmootherClass = image?.src
		? "opacity-70 z-20"
		: "before:text-secondary opacity-100 z-10";

	const textClass = image?.src ? "text-gray-50 text-6xl" : "";
	return (
		<div
			className={`flex flex-col justify-center items-center w-full h-full ${className} p-[10%] text-center bg-gray-50 bg-paperBg bg-cover`}
		>
			<div
				className={`z-20 absolute top-0 left-0 w-[calc(100%-40px)] h-[calc(100%-40px)] m-[20px] p-[5px] ${borderClass}`}
			></div>
			{/*<ImageSmoother className={`${imageSmootherClass}`}></ImageSmoother>
			{image?.src && (
				<ImageBg src={image?.src} alt={image?.alt} className="z-10"></ImageBg>
			)}*/}
			{/*<div className="flex justify-center items-center scale-60 lg:scale-80 w-[170%] sm:scale-100 sm:w-[100%] lg:w-[130%]  z-20 leading-tight h-full !whitespace-normal">
				{content && content}
			</div>*/}
			{typeof content === "string" ? (
				<div className="flex flex-wrap justify-center items-center scale-[65%] w-[170%] h-[200%] sm:scale-90 sm:w-[120%] sm:h-[200%] md:scale-[90%] md:w-[110%] lg:scale-60 lg:w-[160%] lg:h-[200%] xl:scale-80 xl:w-[120%] xl:h-[200%] 2xl:scale-100 2xl:w-[100%] z-20 leading-tight  !whitespace-normal">
					<div>
						<div dangerouslySetInnerHTML={{ __html: content }}></div>
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center scale-60 lg:scale-80 w-[170%] sm:scale-100 sm:w-[100%] lg:w-[130%] z-20 leading-tight h-full !whitespace-normal">
					<div>{content}</div>
				</div>
			)}
		</div>
	);
}

export { BookContent };
