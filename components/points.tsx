type Props = {
    points: number;
}

export const Points = ({
    points,
}: Props) => {
    return (
        <h1 className="text-moneyconf-blue font-extrabold text-3xl">
            {points.toLocaleString()}
        </h1>
    )
}