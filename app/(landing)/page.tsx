"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import { useEffect, useState } from "react";
import Link from "next/link";
//import { useState, useEffect, MutableRefObject } from "react";

/*
export function useIsVisible(ref: MutableRefObject<Element | null>): boolean {
	const [isIntersecting, setIntersecting] = useState(false);
   
	useEffect(() => {
	  const observer = new IntersectionObserver(([entry]) => {
		setIntersecting(entry.isIntersecting);
	  });
   
	  if (ref.current) {
		observer.observe(ref.current);
	  }

	  return () => {
		if (ref.current) {
		  observer.disconnect();
		}
	};
	}, [ref]);
   
	return isIntersecting;
}
*/

const Method = () => {
	return (
		<div className="flex flex-row space-x-5">
			<Image
				src={1 > 1024 ? "./horizonatal-method.svg" : "./vertical-method.svg"}
				alt="Method"
				width={0}
				height={0}
				className="h-auto py-20 w-[15rem] lg:w-[60rem] md:w-[15rem] sm:w-[15rem]"
			/>
			<div className="flex flex-col pt-44 text-xl space-y-40 lg:text-[0rem] lg:space-y-1 md:flex-col md:pt-44 md:text-xl md:space-y-40">
				<h3>
					School workshops
				</h3>
				<h3>
					Online challenge activities
				</h3>
				<h3>
					Parents&#x2019; workshops
				</h3>
				<h3>
					Parental online support
				</h3>
				<h3>
					Teachers&#x2019; resources
				</h3>
			</div>
		</div>
	)
}

const LandingPage = () => {

	const [windowWidth, setWindowWidth] = useState(1024);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		handleResize;

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	//const emailfeedback = () => { toast.success("Email Loading"); }

	return (
		<div className="flex flex-col items-center text-center">
			<h1 id="mission" className="pt-14 font-bold text-5xl text-outward-red">
				My Money Confidence - The Mission
			</h1>
			<ScrollAnimation animateIn="fadeIn">
				<div className="flex flex-col lg:flex-row px-10 items-center">
					<Image
						src="./investment.svg"
						alt="Investment"
						width={0}
						height={0}
						className="w-[30rem] h-auto"
					/>
					<div className="">
						<h3 className="pt-14 text-xl">
							My Money Confidence are a social enterprise on a mission to empower children with money confidence through financial education in the UK.
						</h3>
						<h3 className="pt-14 text-xl">
							We are committed to developing a generation of money savvy individuals who embody money confidence, are empowered with financial knowledge, and are emotionally protected with lifelong financial wellbeing.
						</h3>
						<h3 className="pt-14 text-xl">
							Every child deserves the chance to grow up feeling confident making financial decisions and My Money Confidence is here to do it with impact, professionalism, and fun!
						</h3>
					</div>
				</div>
			</ScrollAnimation>
			<h1 id="story" className="pt-14 font-bold text-5xl text-outward-red px-36">
				My Money Confidence - The Story
			</h1>
			<ScrollAnimation animateIn="fadeIn">
				<div className="flex flex-col lg:flex-row px-10 items-center">
					<div>
						<h3 className="pt-14 text-xl">
							Do you remember all those lessons about money you were taught in school? No?! That&#x2019;s because you probably weren&#x2019;t!
						</h3>
						<h3 className="pt-14 text-xl">
							Maybe it&#x2019;s no surprise then that people are now struggling with the crippling cost-of-living crisis, burgeoning debt, and inadequate savings all while having to navigate a financial landscape that’s rapidly becoming more complex.
						</h3>
						<h3 className="pt-14 text-xl">
							Transformative children&#x2019;s financial education in school is essential to lay the foundation for a lifetime of informed and responsible decision-making. However, extremely tight school budgets, overwhelming existing workloads, and a lack of expert provision mean schools alone can’t deliver this!
						</h3>
					</div>
					<Image
						src="./credit-card.svg"
						alt="Credit Card"
						width={0}
						height={0}
						className="w-[24rem] h-auto"
					/>
				</div>
			</ScrollAnimation>
			<ScrollAnimation animateIn="fadeIn">
				<div className="flex flex-col lg:flex-row px-10 items-center">
					<Image
						src="./backpack.svg"
						alt="Backpack"
						width={0}
						height={0}
						className="w-[24rem] h-auto"
					/>
					<div>
						<h3 className="pt-14 text-xl">
							My Money Confidence is a social enterprise established by a group of qualified teachers with financial backgrounds passionate about children&#x2019;s financial education.
						</h3>
						<h3 className="pt-14 text-xl">
							We know every child should have access to free, impactful, fun financial education, which is why My Money Confidence promise to never charge a penny for our programme delivery in schools!
						</h3>
					</div>
				</div>
			</ScrollAnimation>
			<h1 id="method" className="pt-14 font-bold text-5xl text-outward-red">
				My Money Confidence - The Method
			</h1>
			<ScrollAnimation animateIn="fadeIn">
				<div className="flex flex-col lg:flex-row px-10 items-center">
					<Image
						src="./classroom.svg"
						alt="Classroom"
						width={0}
						height={0}
						className="w-[24rem] h-auto"
					/>
					<div>
						<h3 className="pt-14 text-xl">
							My Money Confidence uses a one-of-a kind educational methodology to financial literacy.
						</h3>
						<h3 className="pt-14 text-xl">
							The unique method is designed to maximise the impact and sustainability of financial education by combining five supportive functions to instil money confidence and competence for all!
						</h3>
					</div>
				</div>
			</ScrollAnimation>
			<Method
			/>
			<h1 id="community" className="pt-14 font-bold text-5xl text-outward-red">
				My Money Confidence - The Community
			</h1>
			<ScrollAnimation animateIn="fadeIn">
				<div className="flex flex-col lg:flex-row px-10 items-center">
					<div>
						<h3 className="pt-14 text-xl">
							My Money Confidence is funded entirely by corporate sponsors, government, and funding organisations. We are always open to collaborating with like-minded individuals, organisations, and institutions that share a passion for empowering the next generation with financial literacy skills and solving the financial challenges we face!
						</h3>
						<h3 className="pt-14 text-xl">
							Let&apos;s join forces to lead the change and create a future where every child grows up empowered with money knowledge, skills, and support!
						</h3>
					</div>
					<Image
						src="./phone.svg"
						alt="Phone"
						width={0}
						height={0}
						className="w-[24rem] h-auto"
					/>
				</div>
			</ScrollAnimation>
			<div className="flex flex-col items-center justify-center text-outward-blue">
				<h1 className="pt-14 text-5xl pb-5">
					Contact My Money Confidence
				</h1>
				{/*onClick={emailfeedback}*/}
				<Button className="w-40 h-16 rounded-xl flex items-center justify-center bg-blue-700">
					<Link href={"mailto:info@mymoneyconfidence.co.uk"} className="text-2xl text-white font-bold px-1">
						Contact Us
					</Link>
				</Button>
				{/*<Toaster />*/}
			</div>
		</div>

	);
};

export default LandingPage;