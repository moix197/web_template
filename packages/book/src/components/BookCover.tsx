import { TitleSection, TitleXl } from "@moix197/base-ui";

function BookCover({
	title = "",
	content = "",
	className = "",
	bookCoverInner = false,
}) {
	return (
		<div
			className={`flex justify-center items-center w-full h-full ${className} bookCover bg-gray-900 p-10 text-center rounded-r-lg overflow-hidden ${
				bookCoverInner && "bookCoverInner"
			}`}
		>
			{/*<ImageSmoother className="before:bg-leatherBg before:bg-cover opacity-50 z-10"></ImageSmoother>*/}
			<div className="z-20">
				{title && <TitleSection className="text-gray-50">{title}</TitleSection>}
				{content && <div>{content}</div>}
			</div>
		</div>
	);
}

export { BookCover };
