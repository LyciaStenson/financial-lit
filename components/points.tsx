type Props = {
    points: number | undefined;
}

export const Points = ({
    points,
}: Props) => {
    return (
        <h1 className="text-moneyconf-blue font-extrabold text-2xl">
            {points?.toLocaleString()}
        </h1>
    )
}