type Props = {
    title: string;
    description: string;
};

export const Banner = ({
    title,
    description,
}: Props) => {
    return (
        <div className="w-full rounded-3xl bg-moneyconf-gold p-5 text-moneyconf-purple border-moneyconf-purple border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white flex items-center text-center">
            <div className="space-y-4 z-10">
                <h3 className="text-2xl font-extrabold">
                    {title}
                </h3>
                <p className="text-3xl font-extrabold">
                    {description}
                </p>
            </div>
        </div>
    )
}