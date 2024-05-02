type Props = {
    title: string;
    description: string;
};

export const Banner = ({
    title,
    description,
}: Props) => {
    return (
        <div className="w-full rounded-xl bg-moneyconf-gold p-5 text-moneyconf-purple border-moneyconf-purple border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white flex items-center justify-between">
            <div className="space-y-2.5 z-10">
                <h3 className="text-sm font-bold">
                    {title}
                </h3>
                <p className="text-2xl font-bold">
                    {description}
                </p>
            </div>
        </div>
    )
}