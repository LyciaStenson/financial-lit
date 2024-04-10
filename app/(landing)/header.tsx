import Image from "next/image";

export const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-xl mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="./Monkey.svg" height={75} width={75} alt="Monkey"></Image>
                    <h1 className="text-2xl font-extrabold text-dark-blue tracking-wide">My Money Confidence</h1>
                </div>
            </div>
        </header>
    );
};
