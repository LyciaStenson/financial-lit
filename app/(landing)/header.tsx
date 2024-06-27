import Image from "next/image";
import Link from "next/link";

export const Header = () => {
	return (
		<header className="h-[766px] bg-outward-red">
			<div className="flex flex-row justify-between items-center px-5 py-2 space-x-5">
				<Image
					src="./logo-inverted.svg"
					alt="My Money Confidence Logo"
					width={0}
					height={0}
					className="w-20 h-auto"
				/>
				<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8">
					<Link href="#mission" className="text-white text-2xl font-extrabold">
						Mission
					</Link>
					<Link href="#story" className="text-white text-2xl font-extrabold">
						Story
					</Link>
					<Link href="#method" className="text-white text-2xl font-extrabold">
						Method
					</Link>
					<Link href="#community" className="text-white text-2xl font-extrabold">
						Community
					</Link>
				</div>
			</div>
			<div className="flex flex-col items-center text-center pt-10 sm:pt-20">
				<h1 className="sm:w-[38rem] font-bold text-[3.5rem] sm:text-[4.5rem] text-white">
					My Money Confidence
				</h1>
				<div className="flex flex-col sm:flex-row items-center justify-center">
					<Image
						src="./logo-inverted.svg"
						alt="My Money Confidence Logo"
						width={0}
						height={0}
						className="w-40 sm:w-80 h-auto"
					/>
					<div className="flex flex-col sm:w-[38rem] h-auto text-[2.7rem] leading-[3.5rem] items-center justify-center font-bold italic text-white">
						<h2>
							Leading the change by empowering children with money confidence!
						</h2>
						<hr className="w-60 sm:w-80 mt-8"></hr>
					</div>
				</div>
			</div>
		</header>
	)
}