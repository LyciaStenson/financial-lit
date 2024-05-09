import Image from "next/image";

export const Header = () => {
    return (
        <header className="h-28 w-full px-4 border-b-2 border-slate-200">
            <div className="lg:max-w-screen-xl mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="./logo-inverted.svg" height={70} width={70} alt="My Money Confidence Logo"></Image>
                    <h1 className="text-3xl font-extrabold text-moneyconf-blue tracking-wide">My Money Confidence</h1>
                </div>
            </div>
        </header>
    );
};
