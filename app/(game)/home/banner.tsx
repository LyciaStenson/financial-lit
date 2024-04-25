type Props = {
    title: string;
    description: string;
};

export const Banner = ({
    title,
    description,
}: Props) => {
    return (
        <div className="w-full rounded-xl bg-fin-lit-gold p-5 text-fin-lit-purple border-fin-lit-purple border-2 border-b-8 flex items-center justify-between">
            <div className="space-y-2.5">
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