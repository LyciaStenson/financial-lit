import { PointsToRank } from "@/src/points-to-rank";

type Props = {
    points: number;
}

export const RankBar = ({
    points,
}: Props) => {

    const rank: string = PointsToRank(points);

    return (
        <div className="border-2 border-b-[5px] border-moneyconf-blue bg-moneyconf-gold items-center text-center text-moneyconf-blue text-xl font-extrabold tracking-[12px] indent-[20px] flex rounded-2xl h-11">
            <div>
                <span>
                    {rank}
                </span>
            </div>
        </div>
    )
}