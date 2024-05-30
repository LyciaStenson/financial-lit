type Props = {
    title: string;
    description: string;
};

export const Banner = ({
    title,
    description,
}: Props) => {
    return (
        <div className="flex w-full px-5 items-center justify-center">
            <div className="rounded-2xl text-center border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple">
                <div className="space-y-1">
                    <h1 className="text-lg font-extrabold">
                        {title}
                    </h1>
                    <h2 className="text-xl font-extrabold">
                        {description}
                    </h2>
                </div>
            </div>
        </div>

    )
}