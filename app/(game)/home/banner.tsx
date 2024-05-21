type Props = {
    title: string;
    description: string;
};

export const Banner = ({
    title,
    description,
}: Props) => {
    return (
        <div className="flex max-w-[450px] rounded-2xl justify-center text-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple">
            <div className="space-y-1 z-10">
                <h1 className="text-lg font-extrabold">
                    {title}
                </h1>
                <h2 className="text-xl font-extrabold">
                    {description}
                </h2>
            </div>
        </div>
    )
}