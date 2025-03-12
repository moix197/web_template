import ImageSmoother from "../ImageSmoother";
import TitleMain from "../Titles/Titlexl";
import TitleSection from "../Titles/TitleSection";

export default function BookCover({
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
			<ImageSmoother className="before:bg-leatherBg before:bg-cover opacity-50 z-10"></ImageSmoother>
			<div className="z-20">
				<div className="mb-4">
					{bookCoverInner} oka
					<TitleMain className="text-gray-50">Lovebook</TitleMain>
				</div>
				{title && <TitleSection className="text-gray-50">{title}</TitleSection>}
				{content && <div>{content}</div>}
			</div>
		</div>
	);
}
