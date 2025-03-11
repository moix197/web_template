import ImageBg from "../ImageBg";
import ImageSmoother from "../ImageSmoother";
import TitleSection from "../Titles/TitleSection";

export default function BookContent({
	title = "",
	content = "",
	className = "",
	image = {
		src: "",
		alt: "",
	},
}) {
	const borderClass = image?.src
		? ""
		: " border border-gray-800 outline outline-1 outline-offset-8";

	const imageSmootherClass = image?.src
		? "opacity-70 z-20"
		: "before:text-secondary opacity-100 z-10";

	const textClass = image?.src ? "text-gray-50 text-6xl" : "";
	return (
		<div
			className={`flex flex-col justify-center items-center w-full h-full ${className} p-20 text-center bg-gray-50 bg-paperBg bg-cover`}
		>
			<div
				className={`z-20 absolute top-0 left-0 w-[calc(100%-40px)] h-[calc(100%-40px)] m-[20px] p-[5px] ${borderClass}`}
			></div>
			<ImageSmoother className={`${imageSmootherClass}`}></ImageSmoother>
			{image?.src && (
				<ImageBg src={image?.src} alt={image?.alt} className="z-10"></ImageBg>
			)}
			<div className="z-20 w-full">
				{title && <TitleSection className={textClass}>{title}</TitleSection>}
				{content && <div>{content}</div>}
			</div>
		</div>
	);
}
