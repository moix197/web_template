import VideoWithReview from "@/components/sections/VideoWithReview";
import Hero from "@/components/sections/Hero";

function Faq() {
	return (
		<div>
			<Hero title="HERO TEST TITLE" className="text-center">
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
				</p>
			</Hero>
			<VideoWithReview
				title="-  Jaqueline M"
				text="
				I had a great experience using EP Films for my wedding videography. They were easy to work with, very prompt at responding, and very reasonably priced! I was also SO impressed with how quickly they delivered my films. They captured the day perfectly and made the whole experience super easy and enjoyable. Rafael was amazing and super accommodating when we wanted to make some edits to the highlight film. They definitely went above and beyond to make sure we were happy with our final videos. I highly recommend EP Films for your wedding"
				href="https://mediazilla.com/kUV9IonRdJ?autoplay=0"
			></VideoWithReview>
			<VideoWithReview
				title="-  Chau"
				text="Love, love, LOVEEEEE our video! EP Films really know how to capture all the right and memorable moments for us. The videographers were super nice and friendly. They really know how to make the atmosphere feel so relaxing and fun for my husband and I, to help us show our best genuine smile, our love, and many laughs. On top of that, their music choices for the video are super great! Their shots of all the different angles really help me feel like I did not miss out on anything on our wedding day. We really enjoy watching it over and over again!"
				href="https://mediazilla.com/BTaXDIVZLs?autoplay=0"
			></VideoWithReview>
		</div>
	);
}

export default Faq;
