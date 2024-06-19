"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Toaster, toast } from 'sonner';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
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

const LandingPage = () => {
    const emailfeedback= () => {toast.success("Email Sent");}
    console.log(window.innerWidth)
    return (
        <div className="flex flex-col w-full h-full items-center">
            <h1 id="mission" className="pt-14 font-bold text-5xl text-outward-red px-36">
                My Money Confidence - The Mission
            </h1>
            <ScrollAnimation animateIn="fadeIn">
            <div className="flex items-center px-36 lg:flex-row md:flex-col sm:flex-col">
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
            <div className="flex flex-row items-center px-36 lg:flex-row md:flex-col sm:flex-col">
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
            <div className="flex flex-row items-center px-36 lg:flex-row md:flex-col sm:flex-col">
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
            <h1 id="method" className="pt-14 font-bold text-5xl text-outward-red px-36">
                My Money Confidence - The Method
            </h1>
            <ScrollAnimation animateIn="fadeIn">
            <div className="flex flex-row items-center px-36 lg:flex-row md:flex-col sm:flex-col">
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
            <Image
                src={window.innerWidth > 1024? "./horizonatal-method.svg" : "./vertical-method.svg"}
                alt="Method"
                width={0}
                height={0}
                className="h-auto py-20 lg:w-[60rem] md:w-[15rem] sm:w-[15rem]"
            />
            <h1 id="community" className="pt-14 font-bold text-5xl text-outward-red px-24">
                My Money Confidence - The Community
            </h1>
            <ScrollAnimation animateIn="fadeIn">
            <div className="flex flex-row items-center px-36 lg:flex-row md:flex-col sm:flex-col">
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
            <div className="flex flex-col items-center text-outward-blue px-16">
                <h1 className="pt-14 text-xl">
                    Contact My Money Confidence
                </h1>
                <div>
                    <h3 className="pt-5 text-lg">
                        Email
                    </h3>
                    <Textarea placeholder="e.g., email@example.com" className="w-96 h-20 flex flex-col bg-blue-100 text-black rounded-xl px-5"/>
                    <h3 className="pt-5 text-lg">
                        Subject
                    </h3>
                    <Textarea placeholder="e.g, Sponsorship" className="w-96 h-20 flex flex-col bg-blue-100 text-black rounded-xl px-5"/>
                    <h3 className="pt-5 text-lg">
                        Your message
                    </h3>
                    <Textarea placeholder="Enter text here" className="w-96 h-80 flex flex-col bg-blue-100 text-black rounded-xl px-4 py-3"/>                
                </div>
                <Button onClick={emailfeedback} className="w-40 h-16 rounded-xl flex items-center justify-center bg-blue-700">
                        <h3 className="text-2xl text-white font-bold"> Send </h3>
                </Button>
                <Toaster/>
            </div>
        </div>
        
    );
};

export default LandingPage;